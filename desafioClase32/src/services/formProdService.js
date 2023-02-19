import { containerFS } from '../persistence/index.js';
import logger from '../scripts/logger.js'


export class FormProdService {
    static async save(title, price, thumbnail){
        try {
            let product = {
                title: title,
                price: price,
                thumbnail: thumbnail
            };
            return await containerFS.save(product)
        } catch (error) {
            logger.error(`error al guardar los productos ${error}`)
        }
    }

    static async getProducts(){
        try {
            let allProducts = await containerFS.getAll()
            return allProducts
        } catch (error) {
            logger.error(`error al traer los productos ${error}`)
        }
    }
}