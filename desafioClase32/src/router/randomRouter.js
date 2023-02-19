import{ Router } from 'express';
import path from 'path'
import {fork} from 'child_process'

const randomRouter = Router()

randomRouter.get('/', (req,res) =>{
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