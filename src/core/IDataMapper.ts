export interface IDataMapper<TDomainEntity, TDalEntity> {
  toDomain(dalEntity: TDalEntity): TDomainEntity;
  toDTO(entity: TDomainEntity): TDalEntity;
}