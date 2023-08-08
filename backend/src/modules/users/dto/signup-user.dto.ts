import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessageValidationDto } from './message-validation.dto';

export class SignupUserDto extends MessageValidationDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please provide username.' })
  username: string;
}
