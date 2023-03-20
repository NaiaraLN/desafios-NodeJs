import FormProdService from "../services/formProdService.js";
import { buildSchema } from 'graphql'
class FormProdController extends FormProdService{
    schema(){
        return buildSchema(`
        type Product {
            id: Int,
            title: String,
            price: Int,
            thumbnail: String
        }
        type Query{
            products: [Product]
        }
        type Mutation{
            postProduct(title:String, price: Int, thumbnail:String): Product
        }
        `)
    }
    root(){
        const root ={
            products: async () => await this.getProducts(),
            postProduct: async (data) => await this.save(data)
        }
        return root
    }
}

export default new FormProdController()