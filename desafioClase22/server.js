//import path from 'path';
import express from 'express';
import handlebars from "express-handlebars";
import{ routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
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
    res.render('table');
})
app.use('/api/productos-test', routerProducts);
app.use('/api/mensajes', routerMessages);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))