import{ Router } from 'express';
import { ProdMockController } from '../controllers/prodMockController.js';

const routerProducts = Router()

routerProducts.post('/', ProdMockController.postProd.bind(ProdMockController))
routerProducts.get('/', ProdMockController.get.bind(ProdMockController))
routerProducts.put('/:id', ProdMockController.put.bind(ProdMockController))
routerProducts.delete('/:id', ProdMockController.deleteId.bind(ProdMockController))
routerProducts.delete('/', ProdMockController.deleteAll.bind(ProdMockController))

export {routerProducts}
