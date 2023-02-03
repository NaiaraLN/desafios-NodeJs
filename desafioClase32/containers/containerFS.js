import fs from "fs"
import {URL} from 'url'
import logger from "../scripts/logger.js"

const _dirname = decodeURI(new URL('.', import.meta.url).pathname)
const path = _dirname +'/../files/'
class Contenedor {
    constructor (name){
        this.fileName = name
    }

    save = async (product) => {
        try {
            if (fs.existsSync(path+this.fileName)) {
                let allProducts = await this.getAll()
                let lastId = allProducts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
                let newProduct = {
                    id: lastId + 1,
                    ...product
                }
                allProducts.push(newProduct)
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(allProducts));
                return newProduct.id
            } else {
                let newProduct = {
                    id: 1,
                    ...product
                }
                await fs.promises.writeFile(path+this.fileName, JSON.stringify([newProduct]))
                return 1
            }
        } catch (error) {
            logger.error(`No se pudo guardar ${error}`)
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(path+this.fileName)) {
                const products = await fs.promises.readFile(path+this.fileName)
                let product = JSON.parse(products)
                return product
            }
        } catch (error) {
            logger.error(`No se encontró el archivo ${error}`)
        }
    }

}

export default Contenedor