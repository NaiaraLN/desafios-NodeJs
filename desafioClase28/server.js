import express from 'express';
import handlebars from "express-handlebars";
import localProdRouter from './router/formProductsRouter.js';
import {routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
import infoRouter from './router/infoRouter.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import PORT from "./utils/port.js"
import {USERNAME, PASSWORD} from "./config.js"

const app = express();

// configuro _dirname
import {URL} from 'url'
import passportRouter from './router/passportRouter.js';

const _dirname = decodeURI(new URL('.', import.meta.url).pathname)

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

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))