const socket = io.connect();

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
                <th>Foto</th> 
            </tr>
            ${prodTable}
        </table>`
        
    }

    allProducts.innerHTML = html;
})

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', product);
    return false;
}

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

socket.on('messages', messages => {
    showMessages(messages)
})

function addMessage(e) {
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
