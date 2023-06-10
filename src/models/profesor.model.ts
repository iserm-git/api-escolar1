import {Entity, model, property} from '@loopback/repository';

@model()
export class Profesor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idProfesor?: number;

  @property({
    type: 'string',
    required: true,
  })
  nomProfesor: string;

  @property({
    type: 'number',
    required: true,
  })
  cveCarrera: number;


  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;
