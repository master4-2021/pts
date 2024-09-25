import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LdapService } from '../ldap/ldap.service';
import { ErrorMessageEnum } from 'src/common/types';
import { ValidatedUser } from '../jwt/jwt.types';
import { LoginPayload } from './auth.types';
import { JwtService } from '../jwt/jwt.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { BusinessException } from 'src/common/exceptions';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly ldapService: LdapService,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  async loginLdap(username: string, password: string): Promise<ValidatedUser> {
    const ldapUser = await this.ldapService.ldapLogin(username, password);

    if (!ldapUser) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser(ldapUser.uid);

    if (!user) {
      const { iv, encryptedData } = await this.encryptService.encrypt(password);
      const record: UserEntity = {
        uid: ldapUser.uid,
        username,
        password: encryptedData,
        iv,
      };

      await this.userService.createUser(record);

      return { username, uid: ldapUser.uid };
    }

    return { username, uid: ldapUser.uid };
  }

  async login(validatedUser: ValidatedUser): Promise<LoginPayload> {
    return await this.jwtService.sign(validatedUser);
  }

  async getLdapCredentials({
    uid,
    username,
  }: ValidatedUser): Promise<{ username: string; password: string }> {
    const user = await this.userService.getUser(uid);

    if (!user) {
      this.logger.error_(
        'User not found',
        new Error('User not found'),
        AuthService.name,
      );
      throw new BusinessException(
        ErrorMessageEnum.businessError,
        HttpStatus.NOT_FOUND,
      );
    }

    const password = await this.encryptService.decrypt(user.password, user.iv);

    return { username, password };
  }
}
