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
    productsForm.innerHTML = html;
}
//AGREGO PRODUCTOS DEL FORM
function addProduct(e) {
    const listProducts = []
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    listProducts.push(product)
    showProductsForm(listProducts)
    return false;
}

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
    const showMessages = messages.map(({ avatar, id, text }) => {
        return `<img src=${avatar} width="40px"><li>${id} : ${text}</li>`
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

const authorSchema = new normalizr.schema.Entity('authors',{},{idAttribute:'id'});
const message = new normalizr.schema.Entity('messages', {
    author: [authorSchema]
},{idAttribute:'_id'});

const denormalizeMsg = (norMessages) =>{
    const denormalizedMessages = normalizr.denormalize(norMessages.result,message,norMessages.entities);
    console.log(denormalizedMessages)

    const longO = JSON.stringify(denormalizedMessages).length;
    console.log("Longitud objeto desnormalizado: ", longO);

    const longN = JSON.stringify(norMessages).length;
    console.log("Longitud objeto normalizado: ", longN);
    const porcentajeC = (longN * 100) / longO;
    let porcentajeTotal = porcentajeC.toFixed(2) + "%"
    console.log("Porcentaje de compresión: ", porcentajeTotal);
    return showMessages(denormalizedMessages, porcentajeTotal)
}

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



