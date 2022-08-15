import { BilletRequestModel, BilletResponseModel } from "../../models/billet";
import { IProducer } from "../services/events/kafka/producer";

export interface ICreateBilletUseCase {
  execute(
    billet: BilletRequestModel
  ): Promise<BilletResponseModel | null>;
}
