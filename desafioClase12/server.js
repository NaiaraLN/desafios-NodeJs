const express = require('express');
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Messages = require('./src/Messages');
const apiMessages = new Messages("messages.txt");

getMethods = async (messages) => {
    await apiMessages.save(messages)
    await apiMessages.getAll()
}

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

let listProduct = [];
let messages = []

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    socket.emit('products', listProduct)
    
    socket.on('new-product', product => {
        if (listProduct.length >= 1) {
            let lastId = listProduct.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
            let newProduct = {
                id: lastId + 1,
                ...product
            }
            listProduct.push(newProduct);
        } else {
            let newProduct = {
                id: 1,
                ...product
            }
            listProduct.push(newProduct);
        }
        io.emit('products', listProduct);
    })
    socket.emit('messages', messages)

    socket.on('newMessage', message => {
        message.date = new Date().toLocaleString()
        messages.push(message)
        getMethods(messages)
        io.emit('messages', messages)
    })

})

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port}`)
})