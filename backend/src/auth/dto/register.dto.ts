import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsNotEmailTypo } from '../../common/is-not-email-typo.decorator.js';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmailTypo()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  password!: string;
}
