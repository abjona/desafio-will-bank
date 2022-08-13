import server from "./server";
import BilletRouters from "./entrypoints/rest/routers/billet-routers";
import { BilletRepositoryImpl } from "./domain/repositories/billet-repository";
import { GetBilletUseCase } from "./domain/use-cases/billet/get-billet";
import { CreateBilletUseCase } from "./domain/use-cases/billet/create-billet";
import { MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/nosql-databse-wrapper";
import { MongoDBBilletDataSource } from "./data/data-sources/mongodb/mongodb-billet-data-source";
import { ProducerMessagePaymentBillet } from "./domain/services/events/kafka/producer";

async function getMongoDS() {
  const uri =
    "mongodb://admin:123@localhost:27017?retryWrites=true&writeConcern=majority";

  const client: MongoClient = new MongoClient(uri);
  await client.connect();
  const db = client.db("BILLET_DB");

  const connectDatabase: NoSQLDatabaseWrapper = {
    find: (query, config) =>
      db.collection("billets").find(query, config).toArray(),
    insertOne: (doc, config) => db.collection("billets").insertOne(doc, config),
  };

  return new MongoDBBilletDataSource(connectDatabase);
}

(async () => {
  const dataSource = await getMongoDS();

  const billetMiddleWare = BilletRouters(
    new CreateBilletUseCase(
      new BilletRepositoryImpl(dataSource),
      new ProducerMessagePaymentBillet()
    ),
    new GetBilletUseCase(new BilletRepositoryImpl(dataSource))
  );

  server.use("/", billetMiddleWare);
  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
