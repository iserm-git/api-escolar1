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
  response,
} from '@loopback/rest';
import {AlumnoGrupo} from '../models';
import {AlumnoGrupoRepository} from '../repositories';

export class AlumnoGrupoControllerController {
  constructor(
    @repository(AlumnoGrupoRepository)
    public alumnoGrupoRepository : AlumnoGrupoRepository,
  ) {}

  @post('/alumno-grupos')
  @response(200, {
    description: 'AlumnoGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(AlumnoGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoGrupo, {
            title: 'NewAlumnoGrupo',
            exclude: ['idAlGpo'],
          }),
        },
      },
    })
    alumnoGrupo: Omit<AlumnoGrupo, 'idAlGpo'>,
  ): Promise<AlumnoGrupo> {
    return this.alumnoGrupoRepository.create(alumnoGrupo);
  }

  @get('/alumno-grupos/count')
  @response(200, {
    description: 'AlumnoGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AlumnoGrupo) where?: Where<AlumnoGrupo>,
  ): Promise<Count> {
    return this.alumnoGrupoRepository.count(where);
  }

  @get('/alumno-grupos')
  @response(200, {
    description: 'Array of AlumnoGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AlumnoGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AlumnoGrupo) filter?: Filter<AlumnoGrupo>,
  ): Promise<AlumnoGrupo[]> {
    return this.alumnoGrupoRepository.find(filter);
  }

  @patch('/alumno-grupos')
  @response(200, {
    description: 'AlumnoGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoGrupo, {partial: true}),
        },
      },
    })
    alumnoGrupo: AlumnoGrupo,
    @param.where(AlumnoGrupo) where?: Where<AlumnoGrupo>,
  ): Promise<Count> {
    return this.alumnoGrupoRepository.updateAll(alumnoGrupo, where);
  }

  @get('/alumno-grupos/{id}')
  @response(200, {
    description: 'AlumnoGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnoGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AlumnoGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<AlumnoGrupo>
  ): Promise<AlumnoGrupo> {
    return this.alumnoGrupoRepository.findById(id, filter);
  }

  @patch('/alumno-grupos/{id}')
  @response(204, {
    description: 'AlumnoGrupo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoGrupo, {partial: true}),
        },
      },
    })
    alumnoGrupo: AlumnoGrupo,
  ): Promise<void> {
    await this.alumnoGrupoRepository.updateById(id, alumnoGrupo);
  }

  @put('/alumno-grupos/{id}')
  @response(204, {
    description: 'AlumnoGrupo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() alumnoGrupo: AlumnoGrupo,
  ): Promise<void> {
    await this.alumnoGrupoRepository.replaceById(id, alumnoGrupo);
  }

  @del('/alumno-grupos/{id}')
  @response(204, {
    description: 'AlumnoGrupo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alumnoGrupoRepository.deleteById(id);
  }
}
