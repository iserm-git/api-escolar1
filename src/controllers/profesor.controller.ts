import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Profesor} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorController {
  constructor(
    @repository(ProfesorRepository)
    public profesorRepository : ProfesorRepository,
  ) {}

  @post('/profesores', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profesor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {
            title: 'NewProfesor',
            exclude: ['idProfesor'],
          }),
        },
      },
    })
    profesor: Omit<Profesor, 'idProfesor'>,
  ): Promise<Profesor> {
    return this.profesorRepository.create(profesor);
  }

  @get('/profesores/count', {
    responses: {
      '200': {
        description: 'Profesor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Profesor) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.profesorRepository.count(where);
  }

  @get('/profesores', {
    responses: {
      '200': {
        description: 'Array of Profesor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Profesor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Profesor) filter?: Filter<Profesor>,
  ): Promise<Profesor[]> {
    return this.profesorRepository.find(filter);
  }

  @patch('/profesores', {
    responses: {
      '200': {
        description: 'Profesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Profesor,
    @param.where(Profesor) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.profesorRepository.updateAll(profesor, where);
  }

  @get('/profesores/{id}', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Profesor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Profesor>
  ): Promise<Profesor> {
    return this.profesorRepository.findById(id, filter);
  }

  @patch('/profesores/{id}', {
    responses: {
      '204': {
        description: 'Profesor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Profesor,
  ): Promise<void> {
    await this.profesorRepository.updateById(id, profesor);
  }

  @put('/profesores/{id}', {
    responses: {
      '204': {
        description: 'Profesor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profesor: Profesor,
  ): Promise<void> {
    await this.profesorRepository.replaceById(id, profesor);
  }

  @del('/profesores/{id}', {
    responses: {
      '204': {
        description: 'Profesor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profesorRepository.deleteById(id);
  }
}
