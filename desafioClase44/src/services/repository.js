import logger from "../scripts/logger.js";
export default class Repository{
    constructor(dao){
        this.dao = dao
    }

    async save({title, price, thumbnail}){
        try {
            let product = {
                title: title,
                price: price,
                thumbnail: thumbnail
            };
            return await this.dao.save(product)
        } catch (error) {
            logger.error(`error al guardar los productos ${error}`)
        }
    }
    async getProducts(){
        try {
            let allProducts = await this.dao.getAll()
            return allProducts
        } catch (error) {
            logger.error(`error al traer los productos ${error}`)
        }
    }
}