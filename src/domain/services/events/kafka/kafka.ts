import { Kafka } from 'kafkajs'
import { env } from 'process'

export class KafkaConfig {
  kafka: Kafka
  topic: any
  brokers: any
  clientId: any

  constructor() {
    this.clientId = env.KAFKA_CLIENT
    this.topic = env.KAFKA_TOPIC
    this.brokers = JSON.parse(env.KAFKA_BROKERS ? env.KAFKA_BROKERS : '')
    this.kafka = new Kafka({ clientId: this.clientId, brokers: this.brokers })
  }
}
