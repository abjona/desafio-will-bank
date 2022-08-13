import { IRequestPayment } from "./request";
import { IResponsePayment } from "./response";

export interface IPaymentBilletUseCase {
  execute(request: IRequestPayment | any): Promise<IResponsePayment | null>;
}