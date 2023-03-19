import {Router} from "express"
import { graphqlHTTP } from 'express-graphql'
import FormProdController from "../controllers/formProdController.js";

const localProdRouter = Router()

localProdRouter.post('/', graphqlHTTP({
    schema:FormProdController.schema, 
    rootValue:FormProdController.root,
    graphiql: true}))

export default localProdRouter;