import logger from '../scripts/logger.js';
import ArrayDAO from '../model/arrayDao/arrayDAO.js';

const arrayDAO = new ArrayDAO()

export class ProdMockService {
    static createProds(){
        const products = arrayDAO.popular()
        if (products) {
            return products
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
    static update(id,newProduct){
        const product = arrayDAO.update(id,newProduct)
        return product
    }
    static deleteById(id){
        const products = arrayDAO.delete(id)
        return products
    }
    static delete(){
        return arrayDAO.deleteAll()

    }
}