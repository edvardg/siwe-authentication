import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards';
import { UsersService } from './users.service';
import { UserEntity } from './entities';
import { SignupUserDto, SignInUserDto, TokenDto, UserDto, NonceDto } from './dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Successfully Signed Up',
  })
  @ApiBody({
    description: 'SignupUserDto',
    type: SignupUserDto,
    required: true,
  })
  async signUp(@Body() createUserDto: SignupUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenDto,
    description: 'Successfully Signed In',
  })
  @ApiBody({
    description: 'SignInUserDto',
    type: SignInUserDto,
    required: true,
  })
  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return this.userService.signinUser(signInUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: NonceDto,
    description: 'Successfully retrieved nonce value',
  })
  @Get('nonce/:ethereumAddress')
  getNonce(@Param('ethereumAddress') ethereumAddress: string) {
    return this.userService.getNonce(ethereumAddress);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'Successfully retrieved user profile',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req): Promise<UserDto> {
    return this.userService.getProfile(req.user);
  }
}
