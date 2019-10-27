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
  container.register('GroupServiceConfig', { useValue: config.microServices.group })

  const services = container.resolve(Services)

  app.get('/templates/:templateId', routes.find(services.template))
  app.get('/templates', routes.listAll(services.template))
  app.post('/templates', routes.create(services.template))
  app.put('/templates/:templateId', routes.update(services.template))
  app.delete('/templates/:templateId', routes.remove(services.template))

  app.use(errors(environment))
})
