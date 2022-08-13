import { BilletRequestModel, BilletResponseModel } from "../../models/billet";

export interface ICreateBilletUseCase {
  execute(billet: BilletRequestModel): Promise<BilletResponseModel | null>;
}