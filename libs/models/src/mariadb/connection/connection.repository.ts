import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Connection } from './entities';

@Injectable()
export class ConnectionRepo {
  constructor(
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
  ) {}

  findManyBy(
    where: FindOptionsWhere<Connection> | FindOptionsWhere<Connection>[],
  ): Promise<Connection[]> {
    return this.connectionRepository.findBy(where);
  }

  connectProfiles(
    firstProfileId: number,
    secondProfileId: number,
  ): Promise<void> {
    return this.connectionRepository.manager.transaction(async (manager) => {
      await Promise.all([
        manager.save(Connection, {
          firstProfileId,
          secondProfileId,
        }),
        manager.save(Connection, {
          firstProfileId: secondProfileId,
          secondProfileId: firstProfileId,
        }),
      ]);
    });
  }

  disconnectProfiles(
    firstProfileId: number,
    secondProfileId: number,
  ): Promise<void> {
    return this.connectionRepository.manager.transaction(async (manager) => {
      await Promise.all([
        manager.delete(Connection, {
          firstProfileId,
          secondProfileId,
        }),
        manager.delete(Connection, {
          firstProfileId: secondProfileId,
          secondProfileId: firstProfileId,
        }),
      ]);
    });
  }

  findConnectionByProfileIds(
    firstProfileId: number,
    secondProfileId: number,
  ): Promise<Connection> {
    return this.connectionRepository.findOneBy({
      firstProfileId,
      secondProfileId,
    });
  }
}
