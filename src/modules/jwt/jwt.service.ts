import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJSJwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';
import { JwtPayload, ValidatedUser } from './jwt.types';
import { TechnicalException } from 'src/common/exceptions';
import { ErrorMessageEnum } from 'src/common/types';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJSJwtService: NestJSJwtService,
    private readonly logger: LoggerService,
  ) {}

  async sign(validatedUser: ValidatedUser) {
    const payload: JwtPayload = {
      username: validatedUser.username,
      sub: validatedUser.uid,
    };

    try {
      const accessToken = await this.nestJSJwtService.signAsync(payload);
      return { accessToken };
    } catch (err) {
      this.logger.error_('Failed to sign jwt', err, JwtService.name, {
        payload,
      });
      throw new TechnicalException(
        ErrorMessageEnum.serviceError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
