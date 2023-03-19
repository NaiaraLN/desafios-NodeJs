import { MONGO_URI,port, mode} from "./config/config.js"
import express from 'express';
import MongoStore from 'connect-mongo'
import passport from 'passport';
import localProdRouter from './router/formProductsRouter.js';
import {routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
import infoRouter from './router/infoRouter.js';
import passportRouter from './router/passportRouter.js';
import session from 'express-session'
import cluster from 'cluster';
import os from 'os'
import logger from './scripts/logger.js';
// configuro _dirname
import {URL} from 'url'
const _dirname = decodeURI(new URL('.', import.meta.url).pathname)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:MONGO_URI, 
        mongoOptions:advancedOptions,
        ttl:600
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling:true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    next()
})
app.use('/api/productos-test', routerProducts);
app.use('/api/mensajes', routerMessages);
app.use('/api/productos', localProdRouter);
app.use('/', passportRouter);
app.use('/info', infoRouter)

app.all('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
})

const modoCluster = mode === 'CLUSTER'
if (modoCluster && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    logger.info(`PID Primario ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        
    }

    cluster.on('exit', worker => {
        logger.info('worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })

}else{

    const server = app.listen(port, () => {
        logger.info(`Servidor escuchando en el puerto ${server.address().port} - pid worker ${process.pid}`)
    })
    server.on('error', error => logger.error(`Error en servidor ${error}`))
}