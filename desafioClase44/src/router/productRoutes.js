import{ Router } from 'express';
import { graphqlHTTP } from 'express-graphql'
import { ProdMockController } from '../controllers/prodMockController.js';

const routerProducts = Router()

routerProducts.post('/', graphqlHTTP({
    schema: ProdMockController.schema,
    root:ProdMockController.root,
    graphiql: true
}))


export {routerProducts}
