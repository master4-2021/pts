import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'PTS', name: 'LdapUser' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ unique: true })
  uid: string;

  @Column()
  iv: string;

  @Column()
  password: string;

  @Column()
  username: string;
}
