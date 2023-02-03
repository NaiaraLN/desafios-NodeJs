import { Router } from "express";
import os from 'os'
import logger from "../scripts/logger.js";
import compression from 'compression'

const infoRouter = Router()
infoRouter.get('/con', compression(),(req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    const args = [];
    for (let i = 2; i < process.argv.length; i++) {
        const el = process.argv[i];
        args.push(el)
    }
    const info = {
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage.rss(),
        path: process.execPath,
        id: process.pid,
        dirname: process.cwd(),
        cpus: os.cpus().length
    }
    res.render('info', {args, info})
})
infoRouter.get('/', (req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    const args = [];
    for (let i = 2; i < process.argv.length; i++) {
        const el = process.argv[i];
        args.push(el)
    }
    const info = {
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage.rss(),
        path: process.execPath,
        id: process.pid,
        dirname: process.cwd(),
        cpus: os.cpus().length
    }
    //console.log({args, info})
    res.render('info', {args, info})
})

export default infoRouter;