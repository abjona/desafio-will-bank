import { Billet } from "../../models/billet";

export interface IBilletRepository {
    createBillet(billet: Billet): void;
    getBillet(uuid: string): Promise<Billet | null>;
}