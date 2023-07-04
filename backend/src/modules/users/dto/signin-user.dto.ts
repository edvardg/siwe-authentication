import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from '../../../common/decorators';

export class SignInUserDto {
  @ApiProperty()
  @IsDefined()
  @IsEthereumAddress()
  @IsNotEmpty({ message: 'Please provide user ethereum address.' })
  ethereumAddress: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please provide message signature.' })
  signature: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please provide message.' })
  message: string;
}
