import Contenedor from "../containers/containerFS.js";
import {Router} from "express"
import logger from '../scripts/logger.js'

const localProdRouter = Router()
const containerFS = new Contenedor('products.json')

localProdRouter.post('/', async (req, res) =>{
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let product = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        await containerFS.save(product)
        res.redirect('/login')
    } catch (error) {
        logger.error(`error al guardar los productos ${error}`)
    }
    
})
localProdRouter.get('/', async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let allProducts = await containerFS.getAll()
        res.json(allProducts)
    } catch (error) {
        logger.error(`error al traer los productos ${error}`)
    }
})

export default localProdRouter;