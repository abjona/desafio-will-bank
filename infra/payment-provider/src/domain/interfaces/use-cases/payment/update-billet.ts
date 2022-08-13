import { BilletUpdated } from "../../../models/billet";

export interface IUpdateBilletUseCase {
  execute(uuid: string, data: BilletUpdated): Promise<any>;
}