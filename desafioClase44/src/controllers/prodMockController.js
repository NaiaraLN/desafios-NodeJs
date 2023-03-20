import ProdMockService from "../services/prodMockService.js";
import { buildSchema } from 'graphql'
class ProdMockController extends ProdMockService{
    schema(){
        return buildSchema(`
        type Product{
            id:Int,
            title: String,
            price: String,
            thumbnail: String
        }
        type Query{
            products: [Product]
        }
        type Mutation{
            createProds(cant:Int): [Product],
            updateProd(id:Int, title:String,price:String,thumbnail:String): Product,
            deleteId(id:Int): [Product],
            deleteAll: [Product]
        }
        `)
    }
    root(){
        const root ={
            products: () => this.getProds(),
            createProds: (cant) => this.createProds(cant),
            updateProd: (data) => this.update(data.id,data),
            deleteId: (id) => this.deleteById(id),
            deleteAll: () => this.delete()
        }
        return root
    }
}

export default new ProdMockController()