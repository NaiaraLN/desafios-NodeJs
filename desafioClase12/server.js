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

let listProduct = [{title: "calculadora", price: 150, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}];

app.get("/", (req, res) => {
    res.render('table', {listProduct});
})


let messages = []

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    //socket.emit('products', listProduct)
    
    socket.on('new-product', product => {
        listProduct.push(product);
        console.log(product);
        //io.sockets.emit('products', listProduct);
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