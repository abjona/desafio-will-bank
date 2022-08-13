import { IPaymentBilletMessage } from "../domain/interfaces/use-cases/payment/message";
import { IPaymentBilletUseCase } from "../domain/interfaces/use-cases/payment/payment-billet";
import { IUpdateBilletUseCase } from "../domain/interfaces/use-cases/payment/update-billet";
import { PaymentStatus } from "../domain/models/billet";

import { KafkaConfig } from "./kafka";

export class ConsumerMessagePaymentBillet extends KafkaConfig {
  paymentBilletUseCase: IPaymentBilletUseCase;
  updateBilletUseCase: IUpdateBilletUseCase;
  constructor(
    paymentBilletUseCase: IPaymentBilletUseCase,
    updateBilletUseCase: IUpdateBilletUseCase
  ) {
    super();
    this.paymentBilletUseCase = paymentBilletUseCase;
    this.updateBilletUseCase = updateBilletUseCase;
  }
  async consumeMessage() {
    const consumer = this.kafka.consumer({
      groupId: this.clientId,
      minBytes: 5,
      maxBytes: 1e6,
      maxWaitTimeInMs: 3000,
    });

    await consumer.connect();
    await consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }: any) => {
        try {
          console.log(`received message: ${message.value}`);

          const paymentMessage: IPaymentBilletMessage = JSON.parse(
            message.value
          );
          await this.proccessMessage(paymentMessage);
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  async proccessMessage(paymentMessage: IPaymentBilletMessage) {
    if (paymentMessage) {
      const data = await this.paymentBilletUseCase.execute(paymentMessage);
      console.log("aqui1", data);

      if (data) {
        const test = {
          uuid: paymentMessage.uuid,
          paymentStatus: PaymentStatus.SUCCESS,
          transactiondId: data?.transactiondId,
          updatedDate: new Date(),
        };
        console.log("aqui2", test);

        await this.updateBilletUseCase.execute(paymentMessage.uuid, {
          paymentStatus: PaymentStatus.SUCCESS,
          transactiondId: data?.transactiondId,
          updatedDate: new Date(),
        });
      } else {
        await this.updateBilletUseCase.execute(paymentMessage.uuid, {
          paymentStatus: PaymentStatus.FAIL,
          transactiondId: "",
          updatedDate: new Date(),
        });
      }
    }
  }
}
