import { FormProdService } from "../services/formProdService.js";

export class FormProdController extends FormProdService{
    static async postProd(req,res){
        const {title, price, thumbnail} = req
        await this.save(title, price, thumbnail)
        res.redirect('/')
    }

    static async getProducts(req,res){
        let allProducts = await this.getProducts()
        res.json(allProducts)
    }
}