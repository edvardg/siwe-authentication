import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { SiweMessage, generateNonce } from 'siwe';
import { FailedToCreateUserException, NoUserFoundException } from '../../common/exceptions';
import { UserEntity } from './entities/user.entity';
import { SignupUserDto, SignInUserDto, TokenDto, UserDto, NonceDto } from './dto';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: SignupUserDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);

      return newUser;
    } catch (err) {
      this.logger.error('Failed to create user, error: ', err.message);
      throw new FailedToCreateUserException(err.toString());
    }
  }

  async signinUser(signInUserDto: SignInUserDto): Promise<TokenDto> {
    await this.verifyUserMessage(signInUserDto);

    const { ethereumAddress } = signInUserDto;

    const user = await this.userRepository.findOneBy({ ethereumAddress });
    if (!user) {
      this.logger.error(`Failed to sign in, no user with ethereumAddress: ${ethereumAddress}`);
      throw new NoUserFoundException(`No user with ethereumAddress: ${ethereumAddress}`);
    }

    const payload = {
      id: user.id,
      ethereumAddress: user.ethereumAddress,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getNonce(): NonceDto {
    return { nonce: generateNonce() };
  }

  async getProfile(user: UserEntity): Promise<UserDto> {
    const { ethereumAddress, username } = user;

    const foundUser = await this.userRepository.findOneBy({
      ethereumAddress,
      username,
    });
    if (!foundUser) {
      this.logger.error(
        `Failed to get user profile, no user with ethereumAddress: ${ethereumAddress}, username: ${username}`,
      );
      throw new NoUserFoundException(
        `No user with ethereumAddress: ${ethereumAddress}, username: ${username}`,
      );
    }

    return {
      username: foundUser.username,
      ethereumAddress: foundUser.ethereumAddress,
    };
  }

  private async verifyUserMessage(signInUserDto: SignInUserDto): Promise<boolean> {
    const { message, signature } = signInUserDto;

    try {
      const siweMessage = new SiweMessage(message);
      await siweMessage.verify({ signature });

      return true;
    } catch (err) {
      this.logger.error('Failed to verify signature, error: ', err.message);
      throw new UnauthorizedException('Failed to verify signature');
    }
  }
}
