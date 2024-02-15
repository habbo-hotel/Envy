import {omit} from 'lodash';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<Entity extends ObjectLiteral> {
  readonly DEFAULT_OPTIONS: any = {
    where: {
      id: -1,
    },
    order: {
      id: 'DESC',
    },
  };

  constructor(readonly repo: Repository<Entity>) {}

  async create(newEntity: Entity): Promise<Entity> {
    const newObject = await this.repo.save(newEntity);

    // @ts-ignore
    if (!newObject.id) {
      throw new Error('Entity missing `id`');
    }

    // @ts-ignore It's expected for entities to have an `id`
    return this.findOneOrFail({where: {id: newObject.id!}});
  }

  find({...opts}: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repo.find({
      ...this.DEFAULT_OPTIONS,
      ...opts,
    });
  }

  findOne({...opts}: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repo.findOne({
      ...this.DEFAULT_OPTIONS,
      ...opts,
    });
  }

  findOneOrFail({...opts}: FindOneOptions<Entity>): Promise<Entity> {
    return this.repo.findOneOrFail({
      ...this.DEFAULT_OPTIONS,
      ...opts,
    });
  }

  async update(
    opts: FindOptionsWhere<Entity>,
    changes: Partial<Entity>
  ): Promise<void> {
    await this.repo.update(
      {
        ...(omit(this.DEFAULT_OPTIONS, ['where', 'order']) as any),
        ...opts,
      },
      changes as any
    );
  }

  async delete(opts: FindOptionsWhere<Entity>): Promise<void> {
    await this.repo.delete({
      ...this.DEFAULT_OPTIONS,
      ...opts,
    });
  }

  async softDelete(opts: FindOptionsWhere<Entity>): Promise<void> {
    await this.repo.softDelete({
      ...this.DEFAULT_OPTIONS,
      ...opts,
    });
  }

  getInstance(): Repository<Entity> {
    return this.repo;
  }
}
