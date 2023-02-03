import express from 'express';
import handlebars from "express-handlebars";
import localProdRouter from './router/formProductsRouter.js';
import {routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
import infoRouter from './router/infoRouter.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import {port, mode} from "./utils/port.js"
import {USERNAME, PASSWORD} from "./config/config.js"
import cluster from 'cluster';
import os from 'os'

// configuro _dirname
import {URL} from 'url'
import passportRouter from './router/passportRouter.js';
import logger from './scripts/logger.js';

const _dirname = decodeURI(new URL('.', import.meta.url).pathname)

const app = express()

// Configuro views
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(_dirname + '/public'));

// configuro las sesiones con Mongo Atlas
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1ezwxyq.mongodb.net/sesionesDesafio?retryWrites=true&w=majority`, 
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