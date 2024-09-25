import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { TechnicalException } from 'src/common/exceptions';
import { ErrorMessageEnum } from 'src/common/types';
import { getProfileQuery } from '../database/queries';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: LoggerService,
  ) {}

  async getUser(uid: string) {
    return await this.userRepository.findOne({ where: { uid } });
  }

  async getProfile(username: string) {
    try {
      const name = `SSMC\\${username}`;
      const [profile] = await this.userRepository.query(getProfileQuery(name));
      console.log(profile);
      return {
        username,
        displayName: profile.DisplayName,
        roleId: profile.RoleId,
        role: profile.RoleName,
        email: profile.Email,
        departmentId: profile.DepartmentId,
        department: profile.DepartmentName,
        sectionId: profile.SectionId,
        section: profile.SectionName,
      };
    } catch (err) {
      this.logger.error_('Failed to get user profile', err, UserService.name);
      throw new TechnicalException(
        ErrorMessageEnum.serviceError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(record: UserEntity) {
    try {
      return await this.userRepository.save(record);
    } catch (err) {
      this.logger.error_('Failed to create user', err, UserService.name);
      throw new TechnicalException(
        ErrorMessageEnum.serviceError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
