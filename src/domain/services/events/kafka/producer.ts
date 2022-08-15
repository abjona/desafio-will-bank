import { KafkaConfig } from "./kafka";
import { IPaymentBilletMessage } from "../../../interfaces/services/events/kafka/message";
import { IProducer } from "../../../interfaces/services/events/kafka/producer";
import { Partitioners } from "kafkajs";

export class ProducerMessagePaymentBillet
  extends KafkaConfig
  implements IProducer
{
  async produce(message: IPaymentBilletMessage) {
    const producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
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
