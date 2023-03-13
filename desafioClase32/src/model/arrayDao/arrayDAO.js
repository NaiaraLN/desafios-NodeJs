import{ createProduct } from "../../mocks/createProducts.js";
import{ createId } from "../../utils/createId.js";
import logger from "../../scripts/logger.js";

class ArrayDAO {

    constructor() {
        this.elementos = []
    }

    popular() {
        let cant = 5
        const newProducts = [];
        for (let i = 0; i < cant; i++) {
            const newProduct = createProduct(createId(1));
            const saveProduct = this.guardar(newProduct);
            newProducts.push(saveProduct);
        }
        return newProducts;
    }

    getAll() {
        return [ ...this.elementos ]
    }

    save(product) {
        if (this.elementos.length > 0) {
            let allProducts = this.getAll()
            let lastId = allProducts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
            let newProduct = {
                id: createId(lastId),
                ...product
            }
            this.elementos.push(newProduct)
            return newProduct.id
        }else if(this.elementos.length === 0){
            let newProduct = {
                id: 1,
                ...product
            }
            this.elementos.push(newProduct)
            return newProduct.id
        }else{
            logger.error('error al guardar el producto')
        }
    }

}

export default ArrayDAO