import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/entrypoints/rest/routers/billet-routers.ts"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Desafio Will-Bank",
    description:
      "Documentação da api de pagamento de boleto.",
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Billet",
      description: "pagamento de boletos",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  definitions: {
    Billet: {
      uuid: "cab71db2-9fc0-4fd8-92a3-22e554dabc3c",
      amount: 12.5,
      billet: "826500000011323116990009002022153320476101001040",
      paymentStatus: "pending",
      createdDate: "2022-08-13T04:20:08.770Z",
      updatedDate: "2022-08-13T04:20:08.770Z",
    },
    CreateBillet: {
      $billet: "826500000011323116990009002022153320476101001040",
      $amount: 12.5,
    },
    ResponseBillet: {
      uuid: "5117773c-b3f8-4b9c-bc57-dd68b7814842",
      billet: "826500000011323116990009002022153320476101001040",
      amount: 12.5,
      paymentStatus: "success",
      createdDate: "2022-08-13T03:52:27.340Z",
      updatedDate: "2022-08-13T03:52:28.596Z",
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require("./src/main");
});
