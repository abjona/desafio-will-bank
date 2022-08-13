import express from "express";
import { Request, Response } from "express";
import { ICreateBilletUseCase } from "../../../domain/interfaces/use-cases/create-billet";
import { IGetBilletUseCase } from "../../../domain/interfaces/use-cases/get-billet";
import {
  BilletRequestModel,
  BilletResponseModel,
} from "../../../domain/models/billet";

export default function BilletRouters(
  createBilletUseCase: ICreateBilletUseCase,
  getBilletUseCase: IGetBilletUseCase
) {
  const router = express.Router();

  router.get("/billet/:uuid", async (req: Request, res: Response) => {
    try {
      // #swagger.tags = ['Billet']
      // #swagger.description = 'get billet'

      const { uuid } = req.params;
      const billet = await getBilletUseCase.execute(uuid);

      /* #swagger.responses[200] = { 
          schema: { "$ref": "#/definitions/ResponseBillet" },
          description: "User registered successfully." } 
      */

      if (billet) res.status(200).send(billet);
      else res.status(404).send({ message: "not found" });
    } catch (err) {
      res.status(500).send({ message: "error get" });
    }
  });

  router.post("/billet", async (req: Request, res: Response) => {
    try {
      /* 	#swagger.tags = ['Billet']
          #swagger.description = 'billet' 
      */

      /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/CreateBillet" }
          } 
      */
      const billet: BilletRequestModel = req.body;
      const billetCreated: BilletResponseModel | null =
        await createBilletUseCase.execute(billet);
      res.status(202).send(billetCreated);
    } catch (err) {
      res.status(500).send({ message: "error saving" });
    }
  });

  return router;
}
