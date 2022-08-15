import { IPaymentBilletMessage } from "./message";

export interface IProducer {
    produce(message: IPaymentBilletMessage): void;
}