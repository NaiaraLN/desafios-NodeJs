import { persistence } from "../config/config.js";
import ArrayDAO from "./arrayDAO.js";
import FileDAO from "./fileDAO.js";

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
