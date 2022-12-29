import{ Router } from 'express';
import ContenedorMemoria from '../containers/contenedorMemoria.js'

const apiProducts = new ContenedorMemoria()
const routerProducts = Router()

routerProducts.post('/', async (req,res) => {
    try {
        res.json(await apiProducts.popular())
    } catch (error) {
        res.send(`Se produjo un error al crear los productos ${err}`);
    }
})
routerProducts.get('/', async (req,res) =>{
    try {
        res.json(await apiProducts.listarAll())
    } catch (err) {
        res.send(`Se produjo un error al obtener los productos ${err}`);
    }
})



export {routerProducts}
