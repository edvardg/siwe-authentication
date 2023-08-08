import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidAddress } from 'ethereumjs-util';

@ValidatorConstraint({ async: true })
export class IsEthereumAddressConstraint implements ValidatorConstraintInterface {
  validate(address: string): boolean {
    return isValidAddress(address);
  }

  defaultMessage() {
    return 'Address ($value) is not a valid Ethereum address';
  }
}

export function IsEthereumAddress(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEthereumAddressConstraint,
    });
  };
}
