import axios, { AxiosResponse } from "axios";
import { IPaymentBilletUseCase } from "../../interfaces/use-cases/payment/payment-billet";
import { IRequestPayment } from "../../interfaces/use-cases/payment/request";

export class PaymentBilletUseCase implements IPaymentBilletUseCase {
  async execute(request: IRequestPayment): Promise<string> {
    const { data }: AxiosResponse<string> = await axios.post(
      "https://run.mocky.io/v3/ba9815d4-bb7e-440e-b2b2-b1bd832d4581",
      request
    );
    
    const findId = data.match("[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}");
    const transactionId = findId ? findId[0] : "";

    return transactionId;
  }
}
