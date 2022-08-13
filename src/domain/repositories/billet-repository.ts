import { IBilletDataSource } from "../../data/interfaces/billet-data-source";
import { Billet } from "../models/billet";
import { IBilletRepository } from "../interfaces/repositories/billet-repository";

export class BilletRepositoryImpl implements IBilletRepository {
    billetDateSource : IBilletDataSource;
    constructor(billetDataSource: IBilletDataSource){
        this.billetDateSource = billetDataSource;
    }
    async createBillet(billet: Billet) {
        await this.billetDateSource.create(billet)
    }
    async getBillet(uuid: string): Promise<Billet| null> {
        return await this.billetDateSource.getOne(uuid);
    }

}
