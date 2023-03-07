import FormProdService from "../services/formProdService.js";

export class FormProdController extends FormProdService{
    static async postProd(req,res){
        const {title, price, thumbnail} = req
        await this.save(title, price, thumbnail)
        res.redirect('/')
    }

    static async getProd(_,res){
        let allProducts = await this.getProducts()
        console.log(allProducts)
        res.json(allProducts)
    }
}