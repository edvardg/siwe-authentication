import { ApiProperty } from '@nestjs/swagger';

export class NonceDto {
  @ApiProperty()
  nonce: string;
}
