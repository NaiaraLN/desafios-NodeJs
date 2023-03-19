import { persistence } from "../config/config.js";
import ArrayDAO from "./arrayDao/arrayDAO.js";
import FileDAO from "./fileDao/fileDAO.js";

class PersistenceFactory {
    static getPersistence = () => {
        if (persistence === 'ARRAY') {
            const dao = new ArrayDAO()
            return dao
        } else {
            const dao = new FileDAO('products.json')
            return dao
        }
    }
}

export default PersistenceFactory
