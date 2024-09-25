import { SetMetadata } from '@nestjs/common';
import { SKIP_JWT_GUARD_KEY } from '../constants';

export const SkipJwtGuard = () => SetMetadata(SKIP_JWT_GUARD_KEY, true);
