import {
  Billet,
  BilletRequestModel,
} from "../../../../src/domain/models/billet";
import { IBilletRepository } from "../../../../src/domain/interfaces/repositories/billet-repository";
import { CreateBilletUseCase } from "../../../../src/domain/use-cases/billet/create-billet";

describe("Create Billet Use Case", () => {
  class MockCreateBillet implements IBilletRepository {
    createBillet(billet: Billet): void {
      throw new Error("Method not implemented.");
    }
    getBillet(uuid: string): Promise<Billet> {
      throw new Error("Method not implemented.");
    }
  }

  let mockBilletRepository: IBilletRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBilletRepository = new MockCreateBillet();
  });

  test("shoud return billet info", async () => {
    const inputData: BilletRequestModel = {
      amount: 32.2,
      billet: "12e9180edfj30819089022",
    };

    jest
      .spyOn(mockBilletRepository, "createBillet")
      .mockImplementation(() => Promise.resolve(inputData));
    const createBilletUseCase = new CreateBilletUseCase(mockBilletRepository);
    await createBilletUseCase.execute(inputData);
    expect(mockBilletRepository.createBillet).toBeCalledTimes(1);
  });
});
