import axios, { AxiosResponse } from "axios";
import { IPaymentBilletUseCase } from "../../interfaces/use-cases/payment/payment-billet";
import { IRequestPayment } from "../../interfaces/use-cases/payment/request";
import { IResponsePayment } from "../../interfaces/use-cases/payment/response";

export class PaymentBilletUseCase implements IPaymentBilletUseCase {
  async execute(request: IRequestPayment): Promise<IResponsePayment> {
    const { data }: AxiosResponse<IResponsePayment> = await axios.post(
      "https://run.mocky.io/v3/ba9815d4-bb7e-440e-b2b2-b1bd832d4581",
      request
    )
    console.log("aqui0");
    return data;
  }
}
