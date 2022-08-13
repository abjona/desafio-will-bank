import { IBilletDataSource } from "../../../src/data/interfaces/billet-data-source";
import { Billet, PaymentStatus } from "../../../src/domain/models/billet";
import { IBilletRepository } from "../../../src/domain/interfaces/repositories/billet-repository";
import { BilletRepositoryImpl } from "../../../src/domain/repositories/billet-repository";

class MockBilletDataSource implements IBilletDataSource {
  create(billet: Billet): Promise<Billet> {
    throw new Error("Method not implemented.");
  }
  getOne(): Promise<Billet> {
    throw new Error("Method not implemented.");
  }
}

describe("Billet Repository", () => {
  let mockBilletDataSource: IBilletDataSource;
  let billetRepository: IBilletRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBilletDataSource = new MockBilletDataSource();
    billetRepository = new BilletRepositoryImpl(mockBilletDataSource);
  });

  describe("crete billet", () => {
    test("shoud create billet", async () => {
      const inputData: Billet = {
        amount: 32.2,
        billet: "12e9180edfj30819089022",
        paymentStatus: PaymentStatus.PENDING,
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      jest
        .spyOn(mockBilletDataSource, "create")
        .mockImplementation(() => Promise.resolve(inputData));

      await billetRepository.createBillet(inputData);
      expect(mockBilletDataSource.create).toHaveBeenCalledWith(inputData);
    });
  });

  describe("get billet", () => {
    test("shoud return billet", async () => {
      const inputData = "2133123412432";

      const returnData: Billet = {
        amount: 32.2,
        billet: "12e9180edfj30819089022",
        paymentStatus: PaymentStatus.PENDING,
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      jest
        .spyOn(mockBilletDataSource, "getOne")
        .mockImplementation(() => Promise.resolve(returnData));

      const result = await billetRepository.getBillet(inputData);
      expect(mockBilletDataSource.getOne).toHaveBeenCalledWith(inputData);
      expect(result).toStrictEqual(returnData);
    });
  });
});
