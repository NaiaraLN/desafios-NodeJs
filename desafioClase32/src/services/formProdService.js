import Repository from "./repository.js"
import PersistenceFactory from "../model/persistenceFactory.js"

//const dao = PersistenceFactory.getPersistence()
class FormProdService extends Repository{
    constructor(){
        super(PersistenceFactory.getPersistence())
    }
}


export default FormProdService
