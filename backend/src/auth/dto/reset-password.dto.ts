import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(64, 64)
  token!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  password!: string;
}
