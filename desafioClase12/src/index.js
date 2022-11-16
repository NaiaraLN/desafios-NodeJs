const socket = io.connect();

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    console.log(product);
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
