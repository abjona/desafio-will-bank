import { IPaymentBilletMessage } from "../domain/interfaces/use-cases/payment/message";
import { IPaymentBilletUseCase } from "../domain/interfaces/use-cases/payment/payment-billet";
import { IUpdateBilletUseCase } from "../domain/interfaces/use-cases/payment/update-billet";
import { PaymentStatus } from "../domain/models/billet";
import { KafkaConfig } from "./kafka";

export class ConsumerMessagePaymentBillet extends KafkaConfig {
  paymentBilletUseCase: IPaymentBilletUseCase;
  updateBilletUseCase: IUpdateBilletUseCase;
  transactionId: string;
  constructor(
    paymentBilletUseCase: IPaymentBilletUseCase,
    updateBilletUseCase: IUpdateBilletUseCase
  ) {
    super();
    this.paymentBilletUseCase = paymentBilletUseCase;
    this.updateBilletUseCase = updateBilletUseCase;
    this.transactionId = "";
  }
  async consumeMessage() {
    this.consumer.on("message", async (message: any) => {
      console.log("message: ", JSON.parse(message.value));
      await this.proccessMessage(JSON.parse(message.value));
    });

    this.consumer.on("error", (error) => {
      console.log(error)
    });
  }

  async proccessMessage(paymentMessage: IPaymentBilletMessage) {
    try {
      if (paymentMessage) {
        const transactionId = await this.paymentBilletUseCase.execute(
          paymentMessage
        );

        if (transactionId) {
          await this.updateBilletUseCase.execute(paymentMessage.uuid, {
            paymentStatus: PaymentStatus.SUCCESS,
            transactionId: transactionId,
            updatedDate: new Date(),
          });
        } else {
          await this.updateBilletUseCase.execute(paymentMessage.uuid, {
            paymentStatus: PaymentStatus.FAIL,
            transactionId: "",
            updatedDate: new Date(),
          });
        }
      }
    } catch (error) {
      console.log("error processing message\n", paymentMessage);
    }
  }
}
