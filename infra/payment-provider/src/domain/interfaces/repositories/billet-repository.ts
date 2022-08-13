import { BilletUpdated } from "../../models/billet";

export interface IBilletRepository {
    updateBillet(uuid: string, billet: BilletUpdated): void;
}