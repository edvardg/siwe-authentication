import { NotFoundException } from '@nestjs/common';

export class NoUserFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.no-user-found', error);
  }
}
