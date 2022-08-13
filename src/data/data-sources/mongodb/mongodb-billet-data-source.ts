import { Billet } from "../../../domain/models/billet";
import { IBilletDataSource } from "../../interfaces/billet-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/nosql-databse-wrapper";

export class MongoDBBilletDataSource implements IBilletDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }
  async create(billet: Billet) {
    await this.db.insertOne(billet, { _id: 0 });
  }
  async getOne(uuid: string): Promise<Billet> {
    const result = await this.db.find({ uuid: uuid }, { _id: 0 });
    const billet: Billet = result.map((item) => ({
      uuid: item.uuid.toString(),
      billet: item.billet,
      amount: item.amount,
      paymentStatus: item.paymentStatus,
      createdDate: item.createdDate,
      updatedDate: item.updatedDate,
    }))[0];

    return billet;
  }
}
