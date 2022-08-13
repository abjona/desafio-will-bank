import { IBilletRepository } from "../../interfaces/repositories/billet-repository";
import { IUpdateBilletUseCase } from "../../interfaces/use-cases/payment/update-billet";
import { BilletUpdated } from "../../models/billet";

export class UpdateBilletUseCase implements IUpdateBilletUseCase {
  billetRepository: IBilletRepository;
  constructor(billetRepository: IBilletRepository) {
    this.billetRepository = billetRepository;
  }

  async execute(uuid: string, data: BilletUpdated): Promise<any> {
      await this.billetRepository.updateBillet(uuid, data)
  }
}
