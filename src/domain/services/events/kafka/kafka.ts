import { Kafka } from "kafkajs";

export class KafkaConfig {
  kafka: Kafka;
  topic: string;
  brokers: string[];
  clientId: string;

  constructor() {
    this.clientId = "my-app-billet";
    this.topic = "billet";
    this.brokers = ["localhost:9092"];
    this.kafka = new Kafka({ clientId: this.clientId, brokers: this.brokers });
  }
}
