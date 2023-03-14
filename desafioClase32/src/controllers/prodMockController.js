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
    static put(req,res){
        let id = Number(req.params.id)
        let product = req.body
        const newProduct = this.update(id,product)
        res.json(newProduct)
    }
    static deleteId(req,res){
        let id = Number(req.params.id)
        console.log(id)
        const products = this.deleteById(id)
        res.json(products)
    }
    static deleteAll(_,res){
        const response = this.delete()
        res.send(response)
    }
}