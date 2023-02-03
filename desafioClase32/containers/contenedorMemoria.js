import{ createProduct } from "../utils/createProducts.js";
import{ createId } from "../utils/createId.js";
import logger from '../scripts/logger.js'

class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    popular() {
        let cant = 5
        const newProducts = [];
        for (let i = 0; i < cant; i++) {
            const newProduct = createProduct(createId());
            const saveProduct = this.guardar(newProduct);
            newProducts.push(saveProduct);
        }
        return newProducts;
    }

    listarAll() {
        return [ ...this.elementos ]
    }

    guardar(newElem) {
        this.elementos.push(newElem)
        return newElem
    }

    borrar(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            logger.error(`Error al borrar: elemento no encontrado`)
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria