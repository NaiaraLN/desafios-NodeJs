import { Router } from "express";
import compression from 'compression'
import { InfoController } from "../controllers/infoController.js";

const infoRouter = Router()
infoRouter.get('/', compression(),InfoController.get.bind(InfoController))

export default infoRouter;