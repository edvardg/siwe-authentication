import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('nonce')
export class NonceEntity {
  @IsNotEmpty()
  @PrimaryColumn()
  ethereumAddress: string;

  @IsNotEmpty()
  @Column()
  nonce: string;
}
