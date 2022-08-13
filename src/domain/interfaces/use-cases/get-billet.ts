import { BilletResponseModel } from "../../models/billet";

export interface IGetBilletUseCase {
  execute(uuid: string): Promise<BilletResponseModel | null>;
}
