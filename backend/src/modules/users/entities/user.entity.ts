import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Index()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column({ unique: true })
  ethereumAddress: string;
}
