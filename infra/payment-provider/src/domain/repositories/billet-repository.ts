import { IBilletDataSource } from "../../data/interfaces/billet-data-source";
import { IBilletRepository } from "../interfaces/repositories/billet-repository";
import { BilletUpdated } from "../models/billet";

export class BilletRepository implements IBilletRepository {
  billetDateSource: IBilletDataSource;
  constructor(billetDataSource: IBilletDataSource) {
    this.billetDateSource = billetDataSource;
  }
  async updateBillet(uuid: string, billet: BilletUpdated) {
    await this.billetDateSource.updateOne(uuid, billet);
  }
}
