import{ Router } from 'express';
import ContenedorMemoria from '../containers/contenedorMemoria.js'
import logger from '../scripts/logger.js';

const apiProducts = new ContenedorMemoria()
const routerProducts = Router()

routerProducts.post('/', (req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    const products = apiProducts.popular()
    if (products) {
        res.json(products)
    }else{
        logger.error(`Se produjo un error al crear los productos ${err}`)
        res.send(`Se produjo un error al crear los productos ${err}`);
    }
})
routerProducts.get('/', (req,res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    const products = apiProducts.listarAll()
    if (products) {
        res.json(products)
    }else{
        logger.error(`Se produjo un error al obtener los productos ${err}`)
        res.send(`Se produjo un error al obtener los productos ${err}`);
    }
})



export {routerProducts}
