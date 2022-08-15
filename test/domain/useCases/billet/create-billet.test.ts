import {
  Billet,
  BilletRequestModel,
} from "../../../../src/domain/models/billet";
import { IBilletRepository } from "../../../../src/domain/interfaces/repositories/billet-repository";
import { CreateBilletUseCase } from "../../../../src/domain/use-cases/billet/create-billet";
import { ProducerMessagePaymentBillet } from "../../../../src/domain/services/events/kafka/producer";
import { IProducer } from "../../../../src/domain/interfaces/services/events/kafka/producer";
import { IPaymentBilletMessage } from "../../../../src/domain/interfaces/services/events/kafka/message";

describe("Create Billet Use Case", () => {
  class MockCreateBillet implements IBilletRepository {
    createBillet(billet: Billet): void {
      throw new Error("Method not implemented.");
    }
    getBillet(uuid: string): Promise<Billet> {
      throw new Error("Method not implemented.");
    }
  }

  class MockKafkaProducer implements IProducer {
    produce(message: IPaymentBilletMessage): void {
      throw new Error("Method not implemented.");
    }
  }

  let mockBilletRepository: IBilletRepository;
  let mockProducerKafka: IProducer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBilletRepository = new MockCreateBillet();
    mockProducerKafka = new MockKafkaProducer();
  });

  test("shoud return billet info", async () => {
    const inputData: BilletRequestModel = {
      amount: 32.2,
      billet: "12e9180edfj30819089022",
    };

    jest
      .spyOn(mockBilletRepository, "createBillet")
      .mockImplementation(() => Promise.resolve(inputData));
    
    jest
      .spyOn(mockProducerKafka, "produce")
      .mockImplementation(() => Promise.resolve());
      
    const producerMessagePaymentBillet = new ProducerMessagePaymentBillet();
    const createBilletUseCase = new CreateBilletUseCase(mockBilletRepository, producerMessagePaymentBillet);
    await createBilletUseCase.execute(inputData);
    expect(mockBilletRepository.createBillet).toBeCalledTimes(1);
  });
});
