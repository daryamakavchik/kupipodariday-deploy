import { HttpException } from '@nestjs/common';
import { ErrorCode, code2message, code2status } from './error-constants';

export class ServerException extends HttpException {
  constructor(code: ErrorCode) {
    super(`${code2message.get(code)}`, Number(code2status.get(code)));
  }
}
