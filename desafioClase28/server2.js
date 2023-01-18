import express from 'express';
import handlebars from "express-handlebars";
import randomRouter from './router/randomRouter.js';

const app = express();

//configuro handlebars
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/randoms', randomRouter)

const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))