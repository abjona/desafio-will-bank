import { Billet } from "../../domain/models/billet";

export interface IBilletDataSource {
  create(billet: Billet): void;
  getOne(uuid: string): Promise<Billet | null>;
}
