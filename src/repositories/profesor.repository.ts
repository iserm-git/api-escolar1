import {DefaultCrudRepository} from '@loopback/repository';
import {Profesor, ProfesorRelations} from '../models';
import {JsonDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.idProfesor,
  ProfesorRelations
> {
  constructor(
    @inject('datasources.jsonData') dataSource: JsonDataDataSource,
  ) {
    super(Profesor, dataSource);
  }
}
