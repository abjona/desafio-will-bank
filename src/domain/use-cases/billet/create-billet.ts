import { IBilletRepository } from "../../interfaces/repositories/billet-repository";
import { ICreateBilletUseCase } from "../../interfaces/use-cases/create-billet";
import {
  BilletRequestModel,
  Billet,
  PaymentStatus,
  BilletResponseModel,
} from "../../models/billet";
import { v4 as uuidv4 } from "uuid";
import { IProducer } from "../../interfaces/services/events/kafka/producer";

export class CreateBilletUseCase implements ICreateBilletUseCase {
  billetRepository: IBilletRepository;
  producerMessagePaymentBillet: IProducer;
  constructor(
    billetRepository: IBilletRepository,
    producerMessagePaymentBillet: IProducer
  ) {
    this.billetRepository = billetRepository;
    this.producerMessagePaymentBillet = producerMessagePaymentBillet;
  }
  async execute(billet: BilletRequestModel): Promise<BilletResponseModel> {
    const newBillet: Billet = {
      uuid: uuidv4(),
      amount: billet.amount,
      billet: billet.billet,
      transactionId: "",
      paymentStatus: PaymentStatus.PENDING,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    await this.billetRepository.createBillet(newBillet);
    await this.producerMessagePaymentBillet.produce({
      uuid: newBillet.uuid,
      amount: newBillet.amount,
      billet: newBillet.billet,
    });
    return newBillet;
  }
}
