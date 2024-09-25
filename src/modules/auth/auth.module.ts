import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LdapModule } from '../ldap/ldap.module';
import { JwtModule } from '../jwt/jwt.module';
import { LocalStrategy } from './strategies/localStrategy';
import { JwtStrategy } from './strategies/jwtStrategy';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local';
import { UserModule } from '../user/user.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [LdapModule, JwtModule, UserModule, EncryptModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
