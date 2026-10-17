import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { suggestEmailFix } from './email-typo.js';

/** Từ chối email có tên miền bị gõ sai trên các nhà cung cấp phổ biến (gmail.co, gmail.con...). */
export function IsNotEmailTypo(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmailTypo',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown) {
          return typeof value !== 'string' || suggestEmailFix(value) === null;
        },
        defaultMessage(args: ValidationArguments) {
          const fix = suggestEmailFix(String(args.value));
          return fix ? `Email có vẻ bị gõ sai tên miền. Ý bạn là ${fix}?` : 'Email không hợp lệ';
        },
      },
    });
  };
}
