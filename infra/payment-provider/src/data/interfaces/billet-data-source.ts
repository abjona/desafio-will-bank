import { BilletUpdated } from "../../domain/models/billet";

export interface IBilletDataSource {
  updateOne(uuid: String, data: BilletUpdated): void;
}
