const express = require('express');
const handlebars = require("express-handlebars");
const app = express();
const { Router } = express;
const routerProducts = Router();

const handlebarsConfig = {
  extname: '.hbs',
  defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}))
app.use("/productos", routerProducts);

let listProduct = [];

app.get("/", (req, res) => {
  res.render('form', {listProduct});
})

routerProducts.post("/", (req, res) => {
    listProduct.push(req.body);
    res.redirect("/");
})

routerProducts.get("/", (req, res) => {
  res.render('table', {listProduct});
})

app.listen(8000, ()=>{
  console.log("Servidor ok, puerto 8000")
})