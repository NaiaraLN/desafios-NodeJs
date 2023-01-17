import { Router } from "express";

const infoRouter = Router()

infoRouter.get('/', (req,res) => {
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
        dirname: process.cwd()
    }
    res.render('info', {args, info})
})

export default infoRouter;