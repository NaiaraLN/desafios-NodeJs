import Contenedor from "../containers/containerFS.js";
import {Router} from "express"

const localProdRouter = Router()
const containerFS = new Contenedor('products.json')

localProdRouter.post('/', async (req, res) =>{
    try {
        let product = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        console.log(product)
        await containerFS.save(product)
        res.redirect('/login')
    } catch (error) {
        console.log(`error al guardar los productos ${error}`)
    }
    
})
localProdRouter.get('/', async (req, res) => {
    try {
        let allProducts = await containerFS.getAll()
        res.json(allProducts)
    } catch (error) {
        console.log(`error al traer los productos ${error}`)
    }
})

export default localProdRouter;