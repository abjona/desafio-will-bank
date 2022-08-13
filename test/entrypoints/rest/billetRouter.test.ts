import request from "supertest";
import {
  Billet,
  BilletResponseModel,
  PaymentStatus,
} from "../../../src/domain/models/billet";
import { ICreateBilletUseCase } from "../../../src/domain/interfaces/use-cases/create-billet";
import { IGetBilletUseCase } from "../../../src/domain/interfaces/use-cases/get-billet";
import server from "../../../src/server";
import BilletRouters from "../../../src/entrypoints/rest/routers/billet-routers";

class MockCreateBilletUseCase implements ICreateBilletUseCase {
  execute(billet: Billet): Promise<Billet> {
    throw new Error("Method not implemented.");
  }
}
class MockGetBilletUseCase implements IGetBilletUseCase {
  execute(uuid: string): Promise<BilletResponseModel> {
    throw new Error("Method not implemented.");
  }
}

describe("Billet router", () => {
  let mockCreateBilletUseCase: MockCreateBilletUseCase;
  let mockGetBilletUseCase: MockGetBilletUseCase;

  beforeAll(() => {
    mockCreateBilletUseCase = new MockCreateBilletUseCase();
    mockGetBilletUseCase = new MockGetBilletUseCase();
    server.use(
      "/billet",
      BilletRouters(mockCreateBilletUseCase, mockGetBilletUseCase)
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /billet", () => {
    test("POST /billet", async () => {
      const inputData: Billet = {
        uuid: "test123",
        amount: 32.2,
        billet: "12e9180edfj30819089022",
        paymentStatus: PaymentStatus.PENDING,
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      jest
        .spyOn(mockCreateBilletUseCase, "execute")
        .mockImplementation(() => Promise.resolve(inputData));

      const response = await request(server).post("/billet").send(inputData);
      expect(response.status).toBe(202);
    });
    test("POST /billet returns 500 on use case error", async () => {
      const inputData: Billet = {
        amount: 32.2,
        billet: "12e9180edfj30819089022",
        paymentStatus: PaymentStatus.PENDING,
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      jest
        .spyOn(mockCreateBilletUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/billet").send(inputData);
      expect(response.status).toBe(500);
    });
  });

  describe("GET /billet", () => {
    test("should return 200 with data", async () => {
      const returnData: Billet = {
        amount: 32.2,
        billet: "12e9180edfj30819089022",
        paymentStatus: PaymentStatus.PENDING,
        createdDate: new Date("2022-08-12T16:39:32.866Z"),
        updatedDate: new Date("2022-08-12T16:39:32.866Z"),
      };

      jest
        .spyOn(mockGetBilletUseCase, "execute")
        .mockImplementation(() => Promise.resolve(returnData));

      const response = await request(server).get("/billet/test123");
      expect(response.status).toBe(200);
      expect(mockGetBilletUseCase.execute).toBeCalledTimes(1);
      expect({
        ...response.body,
        createdDate: new Date(response.body.createdDate),
        updatedDate: new Date(response.body.updatedDate),
      }).toStrictEqual(returnData);
    });

    test("should return 404 on case error", async () => {
      jest
        .spyOn(mockGetBilletUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/billet/1234");
      expect(response.status).toBe(404);
      expect(response).toStrictEqual({ message: "not found" });
    });
  });
});
