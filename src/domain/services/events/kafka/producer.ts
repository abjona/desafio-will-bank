import { KafkaConfig } from "./kafka";
import { IPaymentBilletMessage } from "./message";

export class ProducerMessagePaymentBillet extends KafkaConfig {
  async produce(message: IPaymentBilletMessage) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: this.topic,
      messages: [
        {
          key: message.uuid,
          value: JSON.stringify(message),
        },
      ],
    });

    await producer.disconnect();
  }
}
