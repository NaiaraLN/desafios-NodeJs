import logger from '../scripts/logger.js';
import ArrayDAO from '../model/arrayDao/arrayDAO.js';

const arrayDAO = new ArrayDAO()

export class ProdMockService {
    static createProds(){
        const products = arrayDAO.popular()
        if (products) {
            return {status: 'success', description: 'productos creados con éxito'}
        }else{
            logger.error(`Se produjo un error al crear los productos ${err}`)
        }
    }
    static getProds(){
        const products = arrayDAO.getAll()
        if (products) {
            return products
        }else{
            logger.error(`Se produjo un error al obtener los productos ${err}`)
        }
    }
}