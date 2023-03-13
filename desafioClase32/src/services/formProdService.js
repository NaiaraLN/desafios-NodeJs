import Repository from "./repository.js"
import PersistenceFactory from "../model/persistenceFactory.js"

class FormProdService extends Repository{
    constructor(){
        super(PersistenceFactory.getPersistence())
    }
}


export default FormProdService
