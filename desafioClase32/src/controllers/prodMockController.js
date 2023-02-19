import { ProdMockService } from "../services/prodMockService.js";

export class ProdMockController extends ProdMockService{
    static postProd(_,res){
        const response = this.createProds()
        res.send(response)
    }
    static get(_,res){
        const products = this.getProds()
        res.json(products)
    }
}