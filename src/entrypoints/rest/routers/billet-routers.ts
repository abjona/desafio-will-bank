import express from 'express'
import { Request, Response } from 'express'
import { ICreateBilletUseCase } from '../../../domain/interfaces/use-cases/create-billet'
import { IGetBilletUseCase } from '../../../domain/interfaces/use-cases/get-billet'
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes'
import {
  BilletRequestModel,
  BilletResponseModel,
} from '../../../domain/models/billet'

export default function BilletRouters(
  createBilletUseCase: ICreateBilletUseCase,
  getBilletUseCase: IGetBilletUseCase
) {
  const router = express.Router()

  router.get('/billet/:uuid', async (req: Request, res: Response) => {
    try {
      // #swagger.tags = ['Billet']
      // #swagger.description = 'get billet'

      const { uuid } = req.params
      const billet: BilletResponseModel | null = await getBilletUseCase.execute(
        uuid
      )

      /* #swagger.responses[200] = {
          schema: { "$ref": "#/definitions/ResponseBillet" },
          description: "get information success." }
      */

      if (billet) {
        res.status(StatusCodes.OK).send(billet)
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ uuid, message: ReasonPhrases.NOT_FOUND })
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  })

  router.post('/billet', async (req: Request, res: Response) => {
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

      /* #swagger.responses[202] = {
          schema: { "$ref": "#/definitions/ResponseBillet" },
          description: "billet accepted." }
      */
      const billet: BilletRequestModel = req.body
      const billetCreated: BilletResponseModel | null =
        await createBilletUseCase.execute(billet)
      res.status(StatusCodes.ACCEPTED).send(billetCreated)
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
  })

  return router
}
