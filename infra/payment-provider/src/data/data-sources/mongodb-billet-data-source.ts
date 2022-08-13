import { BilletUpdated } from "../../domain/models/billet";
import { IBilletDataSource } from "../interfaces/billet-data-source";
import { NoSQLDatabaseWrapper } from "../interfaces/nosql-databse-wrapper";

export class MongoDBBilletDataSource implements IBilletDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }
  async updateOne(uuid: string, data: BilletUpdated) {
    await this.db.updateOne(uuid, data);
  }
}
