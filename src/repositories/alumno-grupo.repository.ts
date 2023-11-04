import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {JsonDataDataSource} from '../datasources';
import {AlumnoGrupo, AlumnoGrupoRelations} from '../models';

export class AlumnoGrupoRepository extends DefaultCrudRepository<
  AlumnoGrupo,
  typeof AlumnoGrupo.prototype.idAlGpo,
  AlumnoGrupoRelations
> {
  constructor(
    @inject('datasources.jsonData') dataSource: JsonDataDataSource,
  ) {
    super(AlumnoGrupo, dataSource);
  }
}
