import {Entity, hasMany, model, property} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {Grupo} from './grupo.model';


@model()
export class AlumnoGrupo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idAlGpo?: number;

  @property({
    type: 'number',
    required: true,
  })
  idGrupo: number;

  @property({
    type: 'number',
    required: true,
  })
  idAlumno: number;

  @hasMany(() => Alumno)
  alumnos: Alumno[];

  @hasMany(() => Grupo)
  grupos: Grupo[];


  constructor(data?: Partial<AlumnoGrupo>) {
    super(data);
  }
}

export interface AlumnoGrupoRelations {
  // describe navigational properties here


}

export type AlumnoGrupoWithRelations = AlumnoGrupo & AlumnoGrupoRelations;
