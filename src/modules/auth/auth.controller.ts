import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local';
import { SkipJwtGuard } from 'src/common/decorators/skipJwtGuard';
import { AuthorizedUser } from 'src/common/decorators/authorizedUser';
import { ValidatedUser } from '../jwt/jwt.types';
import { LoginPayload } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @SkipJwtGuard()
  @Post('login')
  async login(@AuthorizedUser() user: ValidatedUser): Promise<LoginPayload> {
    return this.authService.login(user);
  }
}
