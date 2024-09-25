import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedUser } from 'src/common/decorators/authorizedUser';
import { ValidatedUser } from '../jwt/jwt.types';
import { JwtAuthGuard } from '../auth/guards/jwt';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@AuthorizedUser() user: ValidatedUser) {
    return this.userService.getProfile(user.uid);
  }
}
