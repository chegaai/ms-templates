import env from 'sugar-env'
import { IExpressoConfigOptions } from '@expresso/app'
import { IMongoParams } from '@nindoo/mongodb-data-layer'
import { IServerConfig } from '@expresso/server'

export interface IAppConfig extends IExpressoConfigOptions {
  name: string,
  database: {
    mongodb: IMongoParams
  },
  server?: IServerConfig['server'],
  microServices: {
    group: {
      url: string
    }
  },
  azure:{
    storage: {
      accountName: string,
      accountAccessKey: string,
      containerName: string,
      timeOut: number
    }
  }
}

const APP_NAME = 'ms-templates'

export const config: IAppConfig = {
  name: APP_NAME,
  server: {
    printOnListening: true,
  },
  database: {
    mongodb: {
      uri: env.get('DATABASE_MONGODB_URI', 'mongdb://0.0.0.0:27017'),
      dbName: env.get('DATABASE_MONGODB_DBNAME', 'template'),
      maximumConnectionAttempts: 5,
      options: {}
    }
  },
  microServices: {
    group: {
      url: env.get('MICROSERVICE_GROUP_URL', '')
    }
  },
  azure:{
    storage: {
      accountName: env.get('AZURE_STORAGE_ACCOUNT_NAME', 'chegaai'),
      accountAccessKey: env.get('AZURE_STORAGE_ACCOUNT_ACCESS_KEY', ''),
      containerName: env.get('AZURE_STORAGE_CONTAINER_NAME', 'templates'),
      timeOut: env.get('AZURE_STORAGE_TIMEOUT', 60000)

    }
  }
}
