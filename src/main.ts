import server from './server'
import 'dotenv/config'
import BilletRouters from './entrypoints/rest/routers/billet-routers'
import { env } from 'process'
import { BilletRepositoryImpl } from './domain/repositories/billet-repository'
import { GetBilletUseCase } from './domain/use-cases/billet/get-billet'
import { CreateBilletUseCase } from './domain/use-cases/billet/create-billet'
import { MongoClient } from 'mongodb'
import { NoSQLDatabaseWrapper } from './data/interfaces/nosql-databse-wrapper'
import { MongoDBBilletDataSource } from './data/data-sources/mongodb/mongodb-billet-data-source'
import { ProducerMessagePaymentBillet } from './domain/services/events/kafka/producer'

async function getMongoDS() {
  const uri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}?retryWrites=true&writeConcern=majority`

  const client: MongoClient = new MongoClient(uri)
  await client.connect()
  const db = client.db(env.DB_NAME)

  const connectDatabase: NoSQLDatabaseWrapper = {
    find: (query) =>
      db.collection(`${env.COLLECTION}`).find(query).toArray(),
    insertOne: (doc) => db.collection(`${env.COLLECTION}`).insertOne(doc),
  }

  return new MongoDBBilletDataSource(connectDatabase)
}

;(async () => {
  const dataSource = await getMongoDS()

  const billetMiddleWare = BilletRouters(
    new CreateBilletUseCase(
      new BilletRepositoryImpl(dataSource),
      new ProducerMessagePaymentBillet()
    ),
    new GetBilletUseCase(new BilletRepositoryImpl(dataSource))
  )

  server.use('/', billetMiddleWare)
  server.listen(env.SERVER_PORT, () =>
    console.log('Running on http://localhost:4000')
  )
})()
