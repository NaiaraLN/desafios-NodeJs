import FormProdService from "../services/formProdService.js";

class FormProdController extends FormProdService{
    async postProd(req,res){
        const {title, price, thumbnail} = req
        await this.save(title, price, thumbnail)
        res.redirect('/')
    }

    async getProd(_,res){
        let allProducts = await this.getProducts()
        console.log(allProducts)
        res.json(allProducts)
    }
}

export default new FormProdController()