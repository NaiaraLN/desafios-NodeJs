import ContenedorMemoria from "./containers/contenedorMemoria.js";
import Contenedor from "./containers/containerFS.js";


const apiProducts = new ContenedorMemoria()
const containerFS = new Contenedor('products.json')

export {apiProducts, containerFS}