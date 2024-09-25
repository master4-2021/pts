import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageEnum, Message } from './types';
import { errMessages } from './constants';
import { ValidationError } from 'class-validator';

export abstract class CustomException extends HttpException {
  isOperational: boolean;
  code: string;
  constructor(
    message: Message,
    statusCode: HttpStatus,
    isOperational: boolean,
  ) {
    super(message.content, statusCode);
    this.isOperational = isOperational;
    this.code = message.code;

    Object.setPrototypeOf(this, CustomException.prototype);
  }

  getCode() {
    return this.code;
  }
}

export class BusinessException extends CustomException {
  constructor(
    message: ErrorMessageEnum,
    statusCode: HttpStatus,
    isOperational = true,
  ) {
    super(errMessages[message], statusCode, isOperational);
  }
}

export class TechnicalException extends CustomException {
  constructor(
    message: ErrorMessageEnum,
    statusCode: HttpStatus,
    isOperational = false,
  ) {
    super(errMessages[message], statusCode, isOperational);
  }
}

export class FunctionException extends CustomException {
  constructor(message: ErrorMessageEnum, isOperational = false) {
    super(errMessages[message], NaN, isOperational);
  }
}

export class ValidationException extends CustomException {
  constructor(
    errors: ValidationError[],
    statusCode: HttpStatus,
    isOperational = false,
  ) {
    const message = errMessages[ErrorMessageEnum.validationError];
    message.content = errors.reduce<Record<string, string[]>>((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
    super(message, statusCode, isOperational);
  }
}
