const socket = io.connect();

//CONEXIÓN DE PRODUCTOS
const allProducts = document.getElementById('listProducts');
socket.on("products", (list) => {
    let html = "";
    if (!list.length) {
        html = `<span style="color: red;">No hay productos</span>`
    } else {
        let prodTable = list.map(({title, price, thumbnail}) => {
            return `
                <tr>
                    <td style="color: white;" width="100px">${title}</td>
                    <td style="color: white;" width="100px">${price}</td>
                    <td width="100px"><img src=${thumbnail} width="60px"></td>
                </tr>
            `
        });
        html = 
        `<table style="background-color:black;">
            <tr style="color: white;"> 
                <th>Nombre</th> 
                <th>Precio</th> 
                <th>Stock</th>
                <th>Foto</th> 
            </tr>
            ${prodTable}
        </table>`
        
    }

    allProducts.innerHTML = html;
})

//AGREGO PRODUCTOS
function addProduct(e) {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', product);
    return false;
}

//MUESTRO MENSAJES
function showMessages(messages) {
    const showMessages = messages.map(({ date, mail, text }) => {
        return `<li>${mail} - [${date}]: ${text}</li>`
    })

    const messagesHtml = `
    <ul>
    ${showMessages.join('\n')}
    </ul>`

    const listMessages = document.getElementById('messages')
    listMessages.innerHTML = messagesHtml

}
//CONEXIÓN DE MENSAJES
socket.on('messages', messages => {
    showMessages(messages)
})

function addMessage(e) {
    e.preventDefault();
    const inputMail = document.getElementById('mail')
    const inputMessage = document.getElementById('text')
    
    if (inputMail.value && inputMessage.value) {
        const message = {
            mail: inputMail.value,
            text: inputMessage.value
        }
        socket.emit('newMessage', message)
    } else {
        alert('ingrese algun mensaje')
    }
}
