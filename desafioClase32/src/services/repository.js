import logger from "../scripts/logger.js";
export default class Repository{
    constructor(dao){
        console.log(dao)
        this.dao = dao
    }

    static async save(title, price, thumbnail){
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
    static async getProducts(){
        try {
            let allProducts = await this.dao.getAll()
            return allProducts
        } catch (error) {
            logger.error(`error al traer los productos ${error}`)
        }
    }
}