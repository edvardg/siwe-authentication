import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from '../../../common/decorators';

export class SignupUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please provide username.' })
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsEthereumAddress()
  @IsNotEmpty({ message: 'Please provide user ethereum address.' })
  ethereumAddress: string;
}
