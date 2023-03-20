import logger from '../scripts/logger.js';
import ArrayDAO from '../model/arrayDao/arrayDAO.js';

const arrayDAO = new ArrayDAO()

export default class ProdMockService {
    createProds(cant){
        const products = arrayDAO.popular(cant)
        if (products) {
            return products
        }else{
            logger.error(`Se produjo un error al crear los productos ${err}`)
        }
    }
    getProds(){
        const products = arrayDAO.getAll()
        if (products) {
            return products
        }else{
            logger.error(`Se produjo un error al obtener los productos ${err}`)
        }
    }
    update(id,newProduct){
        const product = arrayDAO.update(id,newProduct)
        return product
    }
    deleteById(id){
        const products = arrayDAO.delete(id)
        return products
    }
    delete(){
        return arrayDAO.deleteAll()

    }
}