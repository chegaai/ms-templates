import { routes } from './routes'
import { container } from 'tsyringe'
import expresso from '@expresso/app'
import errors from '@expresso/errors'
import { Services } from '../services'
import { IAppConfig } from '../app.config'
import { createConnection } from '@nindoo/mongodb-data-layer'

export const app = expresso(async (app, config: IAppConfig, environment: string) => {
  const mongodbConnection = await createConnection(config.database.mongodb)
  container.register('MongodbConnection', { useValue: mongodbConnection })
  container.register('BlobStorageConfig', { useValue: config.azure.storage })
  container.register('GroupServiceConfig', { useValue: config.microServices.group })

  const services = container.resolve(Services)

  app.get('/:templateId', routes.find(services.template))
  app.get('/groups/:groupId', routes.listAll(services.template))
  app.post('/', routes.create(services.template))
  app.put('/:templateId', routes.update(services.template))
  app.delete('/:templateId', routes.remove(services.template))

  app.use(errors(environment))
})
