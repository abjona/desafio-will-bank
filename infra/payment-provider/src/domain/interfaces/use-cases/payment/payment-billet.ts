import { IRequestPayment } from "./request";

export interface IPaymentBilletUseCase {
  execute(request: IRequestPayment | any): Promise<string>;
}