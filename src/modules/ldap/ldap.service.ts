import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import { authenticate, AuthenticationOptions } from 'ldap-authentication';
import { LDAPUser } from './ldap.types';

@Injectable()
export class LdapService {
  private readonly LDAP_SERVER_URL: string;
  private readonly BASE_DN: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.LDAP_SERVER_URL = this.configService.get<string>('ldap.host');
    this.BASE_DN = this.configService
      .get<string>('ldap.dn')
      ?.split('.')
      ?.map((dc) => `dc=${dc}`)
      ?.join(',');
  }

  async ldapLogin(username: string, password: string): Promise<LDAPUser> {
    const opts: AuthenticationOptions = {
      ldapOpts: {
        url: this.LDAP_SERVER_URL,
        // tlsOptions: { rejectUnauthorized: false }
      },
      userDn: `cn=${username},cn=Users,${this.BASE_DN}`,
      userPassword: password,
      userSearchBase: this.BASE_DN,
      usernameAttribute: 'uid',
      username: username,
      // starttls: false
    };

    try {
      this.logger.log_('Calling to LDAP server: ', LdapService.name, {
        url: this.LDAP_SERVER_URL,
        dn: this.BASE_DN,
      });
      const userInfo: LDAPUser = await authenticate(opts);
      return userInfo;
    } catch (err) {
      this.logger.error_('Failed to login with LDAP', err, LdapService.name);
      throw new UnauthorizedException();
    }
  }
}
