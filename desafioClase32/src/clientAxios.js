import axios from 'axios'
import logger from './scripts/logger.js'

const url = 'http://localhost:8080/api/productos-test'

axios.post(url)
    .then(result => console.log(result.data))
    .catch(error => logger.error(`Error al crear los productos ${error}`))
/* 
axios.delete('http://localhost:8080/api/productos-test/2')
    .then(result => console.log(result.data))
    .catch(error => logger.error(`error al borrar producto ${error}`)) 

 */
/* 
axios(url)
    .then(result => console.log(result.data))
    .catch(error => logger.error(`Error al traer los productos ${error}`))
 */

/* axios.delete('http://localhost:8080/api/productos-test')
    .then(result => console.log(result.data))
    .catch(error => logger.error(`Error al borrar los productos ${error}`))

 */


axios.put('http://localhost:8080/api/productos-test/5',{
        id:5,
        title:'hola',
        price: 3000,
        thumbnail: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/70.jpg'
    })
    .then(result => console.log(result.data))
    .catch(error => console.log(error))
