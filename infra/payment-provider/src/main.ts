import { MongoClient } from "mongodb";
import { MongoDBBilletDataSource } from "./data/data-sources/mongodb-billet-data-source";
import { NoSQLDatabaseWrapper } from "./data/interfaces/nosql-databse-wrapper";
import { BilletRepository } from "./domain/repositories/billet-repository";
import { PaymentBilletUseCase } from "./domain/use-cases/payment/payment-billet";
import { UpdateBilletUseCase } from "./domain/use-cases/payment/update-billet";
import { ConsumerMessagePaymentBillet } from "./service/consumer";

async function getMongoDS() {
  const uri =
    "mongodb://admin:123@localhost:27017?retryWrites=true&writeConcern=majority";

  const client: MongoClient = new MongoClient(uri);
  await client.connect();
  const db = client.db("BILLET_DB");

  const connectDatabase: NoSQLDatabaseWrapper = {
    updateOne: (uuid, data: any) =>
      db
        .collection("billets")
        .updateOne(
          { uuid: uuid },
          {
            $set: {
              paymentStatus: data.paymentStatus,
              updatedDate: data.updatedDate,
              transactiondId: data.transactiondId
            },
          }
        ),
  };

  return new MongoDBBilletDataSource(connectDatabase);
}

(async () => {
  const dataSource = await getMongoDS();
  const paymentBilletUseCase = new PaymentBilletUseCase();
  const updateBilletUseCase = new UpdateBilletUseCase(
    new BilletRepository(dataSource)
  );
  const consumer = new ConsumerMessagePaymentBillet(
    paymentBilletUseCase,
    updateBilletUseCase
  );
  console.log("Starting consumer...");
  consumer.consumeMessage();
})();
