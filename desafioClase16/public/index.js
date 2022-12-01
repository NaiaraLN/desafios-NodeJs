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
                <tr class="table-tr">
                    <td class="table-td">${title}</td>
                    <td class="table-td">${price}</td>
                    <td class="table-td"><img src=${thumbnail} width="60px"></td>
                </tr>
            `
        });
        html = 
        `<table class="table">
            <thead class="table-head">
                <tr class="table-tr"> 
                    <th class="table-th">Nombre</th> 
                    <th class="table-th">Precio</th> 
                    <th class="table-th">Foto</th> 
                </tr>
            </thead>
            ${prodTable}
        </table>`
        
    }
    allProducts.innerHTML = html;
})

//AGREGO PRODUCTOS
function addProduct(e) {
    //e.preventDefault();
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
    //e.preventDefault();
    
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
    return false;
}
