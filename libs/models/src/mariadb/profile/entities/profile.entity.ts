import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Connection } from '../../connection/entities';
import { Post } from '../../post/entities';
import { User } from '../../user/entities';
import { IProfile } from '../interfaces/profile.interface';

@Entity({ name: 'perfil' })
export class Profile implements IProfile {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', length: 280 })
  name: string;

  @Column({ type: 'datetime', default: null })
  birthdate: Date;

  @Column({ type: 'varchar', length: 280, default: null })
  biography: string;

  @Column({ type: 'varchar', length: 280, default: null })
  profilePicUrl: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  // relations
  @ManyToOne(() => User, (user) => user.profiles)
  user?: User;

  @OneToMany(() => Connection, (connection) => connection.firstProfile)
  firstConnections?: Connection[];

  @OneToMany(() => Connection, (connection) => connection.secondProfile)
  secondConnections?: Connection[];

  @OneToMany(() => Post, (post) => post.profile)
  posts?: Post[];
}
