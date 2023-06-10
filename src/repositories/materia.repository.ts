import {DefaultCrudRepository} from '@loopback/repository';
import {Materia, MateriaRelations} from '../models';
import {JsonDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.idMateria,
  MateriaRelations
> {
  constructor(
    @inject('datasources.jsonData') dataSource: JsonDataDataSource,
  ) {
    super(Materia, dataSource);
  }
}
