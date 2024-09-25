import { Module } from '@nestjs/common';
import { K2ApiService } from './k2Api.service';

@Module({
  imports: [],
  providers: [K2ApiService],
})
export class K2ApiModule {}
