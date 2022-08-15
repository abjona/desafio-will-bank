import { Billet, PaymentStatus } from "../../../../src/domain/models/billet";
import { IBilletRepository } from "../../../../src/domain/interfaces/repositories/billet-repository";
import { GetBilletUseCase } from "../../../../src/domain/use-cases/billet/get-billet";

describe("Get Billet Use Case", () => {
  class MockGetBillet implements IBilletRepository {
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
    mockBilletRepository = new MockGetBillet();
  });

  test("shoud return billet info", async () => {
    const returnData: Billet = {
      amount: 32.2,
      billet: "12e9180edfj30819089022",
      transactionId: "",
      paymentStatus: PaymentStatus.PENDING,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    const inputData = "2142387847234";

    jest
      .spyOn(mockBilletRepository, "getBillet")
      .mockImplementation(() => Promise.resolve(returnData));
    const billetUseCase = new GetBilletUseCase(mockBilletRepository);
    const result = await billetUseCase.execute(inputData);
    expect(result).toBe(returnData);
  });
});
