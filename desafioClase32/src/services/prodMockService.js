import logger from '../scripts/logger.js';
import { apiProducts } from '../persistence/index.js';

export class ProdMockService {
    static createProds(){
        const products = apiProducts.popular()
        if (products) {
            return {status: 'success', description: 'productos creados con éxito'}
        }else{
            logger.error(`Se produjo un error al crear los productos ${err}`)
        }
    }
    static getProds(){
        const products = apiProducts.listarAll()
        if (products) {
            return products
        }else{
            logger.error(`Se produjo un error al obtener los productos ${err}`)
        }
    }
}