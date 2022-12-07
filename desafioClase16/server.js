const express = require('express');
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const ClientSql = require('./helpers/sql');
const optionsProds = require('./options/mariaDB')
const optionsMsg = require('./options/sqLite3');
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

const mdb = new ClientSql(optionsProds.options,'products')
const sqlite = new ClientSql(optionsMsg.options, 'messages')

// Hago conexiones con socket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    //PRODUCTOS
    mdb.createTable()
    .then(() => {
        console.log('table "products" created')
        return mdb.listAll() 
    })
    .then((prods) => socket.emit('products', prods))
    .catch((err) => console.log(err))
    

    socket.on('new-product', product => {
        mdb.insertAll(product)
        .then(() => {
            console.log('product inserted')
            return mdb.listAll()
        })
        .then((prods) => io.emit('products', prods))
        .catch((err) => console.log(err))
    })
    
    //MENSAJES
    sqlite.createTable()
    .then(() => {
        console.log('table "messages" created')
        return sqlite.listAll()
    })
    .then((msg) => socket.emit('messages', msg))
    .catch((err) => console.log(err))
    
    
    socket.on('newMessage', message => {
        message.date = new Date().toLocaleString()
        sqlite.insertAll(message)
        .then(() => {
            console.log("message inserted")
            return sqlite.listAll()
        })
        .then((msg) => io.emit('messages', msg))
        .catch((err) => console.log(err))
    })
})

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port}`)
})