import { MONGO_URI,port, mode} from "./config/config.js"
import express from 'express';
import MongoStore from 'connect-mongo'
import passport from 'passport';
import { graphqlHTTP } from 'express-graphql'
import compression from 'compression'
import FormProdController from './controllers/formProdController.js';
import ProdMockController from './controllers/prodMockController.js'
import MessageController from './controllers/messageController.js';
import InfoController from './controllers/infoController.js';
import passportRouter from './router/passportRouter.js';
import session from 'express-session'
import cluster from 'cluster';
import os from 'os'
import logger from './scripts/logger.js';

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
app.use('/', passportRouter);
app.use('/api/productos-test', graphqlHTTP({
    schema: ProdMockController.schema(),
    root:ProdMockController.root(),
    graphiql: true
}));

app.use('/api/mensajes', graphqlHTTP({
    schema:MessageController.schema(),
    rootValue:MessageController.root(),
    graphiql:true
}));

app.use('/api/productos', graphqlHTTP({
    schema:FormProdController.schema(), 
    rootValue:FormProdController.root(),
    graphiql: true}));


app.use('/info', compression(),graphqlHTTP({
    schema: InfoController.schema(),
    rootValue: InfoController.root(),
    graphiql: true
}))

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