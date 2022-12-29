import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import handlebars from "express-handlebars";
import localProdRouter from './router/formProductsRouter.js';
import {routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();


import {URL} from 'url'

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

app.get("/", (req, res) => {
    res.send('Servidor express ok!')
})
app.get("/login", (req, res) => {
    res.render('form');
})
app.get("/logout", (req,res)=>{
    res.render('logout', {userName})
})
app.use('/api/productos-test', routerProducts);
app.use('/api/mensajes', routerMessages);
app.use('/api/productos', localProdRouter)


// configuro las sesiones con Mongo Atlas
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.1ezwxyq.mongodb.net/sesionesDesafio?retryWrites=true&w=majority`, 
        mongoOptions:advancedOptions,
        ttl:60
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling:true
}))

let userName;
app.post('/login', async  (req,res) => {
    try {
        console.log(req.body.userName)
        userName = req.body.userName;
        req.session.user = userName;
        if (req.session?.user) {
            res.render('login', {userName});
        } else {
            res.render('form')
        }
        console.log(`se conectó el usuario ${userName}`)
    } catch (error) {
        console.log(`se produjo un error al crear la sesión ${error}`);
    }
})
app.get('/login', (req, res) =>{
    if (req.session?.user) {
        res.render('login', {userName});
    } else {
        res.render('form')
    }
})
app.post('/logout', (req, res) =>{
    req.session.destroy(err => {
        if (err) {
            res.send({status: 'Logout ERROR', body: err })
        } else {
            console.log('Logout ok!')
            res.redirect('/logout')
        }
    })
})



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))