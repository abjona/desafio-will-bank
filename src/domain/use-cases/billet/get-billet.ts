import { IBilletRepository } from "../../interfaces/repositories/billet-repository";
import { IGetBilletUseCase } from "../../interfaces/use-cases/get-billet";
import { BilletResponseModel } from "../../models/billet";

export class GetBilletUseCase implements IGetBilletUseCase {
  billetRepository: IBilletRepository;
  constructor(billetRepository: IBilletRepository) {
    this.billetRepository = billetRepository;
  }
  async execute(uuid: string): Promise<BilletResponseModel | null> {
    const resultRepository = await this.billetRepository.getBillet(uuid);
    const result : BilletResponseModel | null = resultRepository;

    return result;
  }
}
