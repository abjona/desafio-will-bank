import { MongoDBBilletDataSource } from "../../../../src/data/data-sources/mongodb/mongodb-billet-data-source";
import { NoSQLDatabaseWrapper } from "../../../../src/data/interfaces/nosql-databse-wrapper";
import { PaymentStatus } from "../../../../src/domain/models/billet";

describe("MongoDB DataSource", () => {
  let mockDatabase: NoSQLDatabaseWrapper;

  let mockBillet = {
    uuid: "1234",
    amount: 23.8,
    billet: "dh839ry23r23",
    paymentStatus: PaymentStatus.PENDING,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  beforeAll(async () => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create", async () => {
    const ds = new MongoDBBilletDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve({ insertedId: "123" }));

    const result = await ds.create(mockBillet);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(mockBillet);
  });

  test("getOne", async () => {
    const ds = new MongoDBBilletDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "find")
      .mockImplementation(() => Promise.resolve([mockBillet]));
    const result = await ds.getOne("1234");
    expect(result).toStrictEqual(mockBillet);
    expect(mockDatabase.find).toHaveBeenCalledWith({ uuid: "1234" });
  });
});
