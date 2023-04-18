import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IRole } from '../interfaces/role.interface';
import { UserRole } from './userRole.entity';

@Entity({ name: 'papel' })
export class Role implements IRole {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 280 })
  title: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt?: Date;

  // relations
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles?: UserRole[];
}
