const express = require('express');
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { mdb, sqlite} = require('./helpers/knexConnection');

// Configuro views
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render('table');
})

// Hago conexiones con socket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    //PRODUCTOS
    mdb.from('products').select('*')
    .then((prods) => socket.emit('products', prods))
    .catch((err) => { console.log(err); throw err })
    

    socket.on('new-product', product => {
        mdb('products').insert(product)
        .then(() => console.log("product inserted"))
        .then((prods) => io.emit('products', prods))
        
        mdb.from('products').select('*')
        .then((prods) => socket.emit('products', prods))
        .catch((err) => { console.log(err); throw err })
    })
    
    //MENSAJES
    sqlite.from('messages').select('*')
        .then((msg) => socket.emit('messages', msg))
        .catch((err) => { console.log(err); throw err })
    
    socket.on('newMessage', message => {
        message.date = new Date().toLocaleString()
        mdb('messages').insert(message)
        .then(() => console.log("message inserted"))
        .then((msg) => io.emit('messages', msg))
        
        sqlite.from('messages').select('*')
        .then((msg) => socket.emit('messages', msg))
        .catch((err) => { console.log(err); throw err })
    })
})

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port}`)
})