import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { K2ApiService } from '../k2Api/k2Api.service';
import { DataSource } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly k2ApiService: K2ApiService,
    private readonly datasource: DataSource,
  ) {}

  async getLocations() {}

  async getLocationByFilter() {}
}
