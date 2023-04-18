import { Profile } from '../../profile/entities/profile.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { IConnection } from '../interfaces/connection.interface';

@Entity({ name: 'conexao' })
@Unique('Connection_Unique', ['firstProfile', 'secondProfile'])
export class Connection implements IConnection {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int' })
  firstProfileId: number;

  @Column({ type: 'int' })
  secondProfileId: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  // relations
  @ManyToOne(() => Profile, (profile) => profile.firstConnections)
  firstProfile?: Profile;

  @ManyToOne(() => Profile, (profile) => profile.secondConnections)
  secondProfile?: Profile;
}
