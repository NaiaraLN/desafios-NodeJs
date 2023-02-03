import{ Router } from 'express';
import path from 'path'
import {fork} from 'child_process'
import logger from '../scripts/logger';

const randomRouter = Router()

randomRouter.get('/', (req,res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    let cant = req.query?.cant ?? 1e8
    const computo = fork(path.resolve(process.cwd(), 'computo.js'))
    computo.on('message', resultado => {
        if (resultado == 'listo') {
            computo.send(cant)
        }else{
            res.json({resultado})
        }
    })
})

export default randomRouter;