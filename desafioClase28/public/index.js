//CONEXIÓN DE PRODUCTOS
const allProducts = document.getElementById('listProducts');
const showProducts = (list) => {
    let html = "";
    if (!list.length) {
        html = `<span style="color: red;">No hay productos</span>`
    } else {
        let prodTable = list.map(({title, price, thumbnail}) => {
            return `
                <tr class="table-tr">
                    <td class="table-td">${title}</td>
                    <td class="table-td">${price}</td>
                    <td class="table-td"><img src=${thumbnail} width="200px"></td>
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
}
const productsForm = document.getElementById('listProductsForm')
const showProductsForm = (list) => {
    let html = "";
    if (!list.length) {
        html = `<span style="color: red;">No hay productos</span>`
    } else {
        let prodTable = list.map(({title, price, thumbnail}) => {
            return `
                <tr class="table-tr">
                    <td class="table-td">${title}</td>
                    <td class="table-td">${price}</td>
                    <td class="table-td"><img src=${thumbnail} width="100px"></td>
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
    productsForm.innerHTML = html;
}
//AGREGO PRODUCTOS DEL FORM
fetch("http://localhost:8080/api/productos")
.then((respuesta) => {
    console.log(respuesta)
    return respuesta.json()
    })
.then((data) => {
    console.log(data)
    return showProductsForm(data)})
.catch(err => console.log(err))


fetch('http://localhost:8080/api/productos-test')
.then((respuesta) => {
    console.log(respuesta)
    return respuesta.json()
    })
.then((data) => {
    console.log(data)
    return showProducts(data)})
.catch(err => console.log(err))


//MUESTRO MENSAJES
function showMessages(messages, porcent) {
    const allMessages = messages.messages
    let allAuthors = []
    allMessages.forEach(element => {
        let text = element.text
        let authors = element.author
        for (let index = 0; index < authors.length; index++) {
            const element = authors[index];
            let message = {
                text,
                ...element
            }
            allAuthors.push(message)
        }
    });
    const showMessages = allAuthors.map(({ avatar, _id, text }) => {
        return `<li><img src=${avatar} class="avatar" width="40px">${_id} : ${text}</li>`
    })

    const messagesHtml = `
    <ul>
    ${showMessages.join('\n')}
    </ul>`
    const listMessages = document.getElementById('messages')
    listMessages.innerHTML = messagesHtml
    messagesPorcent(porcent)
}

//MUESTRO PORCENTAJE
function messagesPorcent(porcent){
    let subtitle = document.getElementById('porcentaje')
    let html = `<span style="color: red;">Compresión: ${porcent}</span>`
    subtitle.innerHTML = html;
}

/* ENTIDADES DE LOS MENSAJES */

const authorSchema = new normalizr.schema.Entity('authors',{},{idAttribute:'id'});
const message = new normalizr.schema.Entity('messages', {
    author: [authorSchema]
},{idAttribute:'_id'});
const posts = new normalizr.schema.Entity('posts',{messages: [message]});

const denormalizeMsg = (norMessages) =>{
    const denormalizedMessages = normalizr.denormalize(norMessages.result,posts,norMessages.entities);
    console.log(denormalizedMessages)

    /* LONGITUD Y PORCENTAJES */
    const longO = JSON.stringify(denormalizedMessages).length;
    console.log("Longitud objeto desnormalizado: ", longO);

    const longN = JSON.stringify(norMessages).length;
    console.log("Longitud objeto normalizado: ", longN);

    const porcentajeC = (longN * 100) / longO;

    let porcentajeTotal = porcentajeC.toFixed(2) + "%"
    console.log("Porcentaje de compresión: ", porcentajeTotal);

    return showMessages(denormalizedMessages, porcentajeTotal)
}

/* TRAIGO ARRAY DE MENSAJES NORMALIZADOS */
    fetch('http://localhost:8080/api/mensajes')
    .then((respuesta) => {
        console.log(respuesta)
        return respuesta.json()
    })
    .then((data) => {
        console.log(data)
        return denormalizeMsg(data)
    })
    .catch(err => console.log(err))




