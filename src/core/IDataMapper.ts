export interface IDataMapper<TDomainEntity, TDalEntity> {
  toDomain(dalEntity: TDalEntity): TDomainEntity;
  toDalEntity(entity: TDomainEntity): TDalEntity;
}
