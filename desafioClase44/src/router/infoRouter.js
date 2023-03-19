import { Router } from "express";
import { graphqlHTTP } from 'express-graphql'
import compression from 'compression'
import { InfoController } from "../controllers/infoController.js";

const infoRouter = Router()
infoRouter.post('/', compression(),graphqlHTTP({
    schema: InfoController.schema,
    rootValue: InfoController.root,
    graphiql: true
}))

export default infoRouter;