const optionsProds = require('../options/mariaDB')
const optionsMsg = require('../options/sqLite3');
let mdb = require("knex")(optionsProds.options)
let sqlite = require("knex")(optionsMsg.options)



module.exports = {
    mdb,
    sqlite
}