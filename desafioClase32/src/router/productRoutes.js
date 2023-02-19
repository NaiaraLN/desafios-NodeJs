import{ Router } from 'express';
import { ProdMockController } from '../controllers/prodMockController.js';

const routerProducts = Router()

routerProducts.post('/', ProdMockController.postProd.bind(ProdMockController))
routerProducts.get('/', ProdMockController.get.bind(ProdMockController))

export {routerProducts}
