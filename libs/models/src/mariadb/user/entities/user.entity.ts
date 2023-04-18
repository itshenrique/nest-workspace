import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profile/entities';
import { IUser } from '../interfaces/user.interface';
import { UserRole } from './userRole.entity';

@Entity({ name: 'usuario' })
export class User implements IUser {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 280, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 280, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 280 })
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt?: Date;

  // relations
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles?: Profile[];
}
