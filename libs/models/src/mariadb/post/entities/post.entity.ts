import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IPost } from '../interfaces/post.interface';
import { Profile } from '../../profile/entities/profile.entity';

@Entity({ name: 'post' })
export class Post implements IPost {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int' })
  profileId: number;

  @Column({ type: 'varchar', length: 280 })
  message: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  // relations
  @ManyToOne(() => Profile, (profile) => profile.posts)
  profile?: Profile;
}
