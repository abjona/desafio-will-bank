// import { Kafka } from "kafkajs";
import Kafka from "kafka-node";

export class KafkaConfig {
  kafkaClient: Kafka.KafkaClient;
  consumer: Kafka.Consumer;
  topic: string;
  brokers: string;
  clientId: string;

  constructor() {
    this.clientId = "my-app-billet";
    this.topic = "billet";
    this.brokers = "kafka:29092";
    this.kafkaClient = new Kafka.KafkaClient({
      clientId: this.clientId,
      kafkaHost: this.brokers,
      idleConnection: 24 * 60 * 60 * 1000,
    });

    this.consumer = new Kafka.Consumer(
      this.kafkaClient,
      [{ topic: this.topic, partition: 0 }],
      {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: "utf8",
      }
    );
  }
}
