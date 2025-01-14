import { Module } from '@nestjs/common';
import { LdapService } from './ldap.service';

@Module({
  providers: [LdapService],
  exports: [LdapService],
})
export class LdapModule {}
