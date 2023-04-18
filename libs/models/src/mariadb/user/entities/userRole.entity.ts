import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IUserRole } from '../interfaces/userRole.interface';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'usuario_papel' })
export class UserRole implements IUserRole {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  roleId: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt?: Date;

  // relations
  @ManyToOne(() => User, (user) => user.userRoles)
  user?: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role?: Role;
}
