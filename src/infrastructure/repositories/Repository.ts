import { IRepository } from '@core/IRepository';
import { unmanaged, injectable } from 'inversify';
import { Collection } from 'mongodb';
import { IDataMapper } from '@core/IDataMapper';

@injectable()
export class Repository<TDomainEntity, TDalEntity>
implements IRepository<TDomainEntity> {
  private readonly collectionInstance: Collection;
  private readonly dataMapper: IDataMapper<TDomainEntity, TDalEntity>;

  constructor(
    @unmanaged() collectionInstance: Collection,
    @unmanaged() dataMapper: IDataMapper<TDomainEntity, TDalEntity>,
  ) {
    this.collectionInstance = collectionInstance;
    this.dataMapper = dataMapper;
  }

  async findAll(): Promise<TDomainEntity[]> {
    const dbResult = await this.collectionInstance.find({}).toArray();
    return dbResult.map((result) => this.dataMapper.toDomain(result));
  }

  async findOneById(guid: string): Promise<TDomainEntity> {
    const dbResult = await this.collectionInstance.findOne({ guid });
    return this.dataMapper.toDomain(dbResult);
  }

  async save(entity: TDomainEntity): Promise<void> {
    await this.collectionInstance.insertOne(entity);
  }

  async update(entity: TDomainEntity): Promise<void> {
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented');
  }
}
