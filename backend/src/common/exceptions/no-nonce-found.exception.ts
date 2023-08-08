import { NotFoundException } from '@nestjs/common';

export class NoNonceFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.no-nonce-found', error);
  }
}
