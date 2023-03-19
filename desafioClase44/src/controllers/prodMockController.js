import { ProdMockService } from "../services/prodMockService.js";
import { buildSchema } from 'graphql'
export class ProdMockController extends ProdMockService{
    schema(){
        return buildSchema(`
        type Product{
            id:Int,
            title: String,
            price: Number,
            thumbnail: String
        }
        type Query{
            products: [Product]
        }
        type Mutation{
            createProducts: [Product],
            updateProd(id:Int, title:String,price:Number,thumbnail:String): Product,
            deleteId(id:Int): [Product],
            deleteAll: [Product]
        }
        `)
    }
    root(){
        const root ={
            products: () => this.getProds(),
            createProducts: () => this.createProds(),
            updateProd: (data) => this.update(data.id,data),
            deleteId: (id) => this.deleteById(id),
            deleteAll: () => this.delete()
        }
        return root
    }
}