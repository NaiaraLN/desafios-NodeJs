import{ Router } from 'express';
import { graphqlHTTP } from 'express-graphql'
import { MessageController } from '../controllers/messageController.js';

const routerMessages = Router()

routerMessages.post('/', graphqlHTTP({
    schema:MessageController.schema,
    rootValue:MessageController.root,
    graphiql:true
}))

export default routerMessages