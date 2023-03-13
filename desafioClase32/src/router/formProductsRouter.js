import {Router} from "express"
import FormProdController from "../controllers/formProdController.js";

const localProdRouter = Router()

localProdRouter.post('/', FormProdController.postProd.bind(FormProdController))
localProdRouter.get('/', FormProdController.getProd.bind(FormProdController))

export default localProdRouter;