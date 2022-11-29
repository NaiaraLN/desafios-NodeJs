const {sqlite} = require('./helpers/knexConnection');
// creo tabla de mensajes
sqlite.schema
    .createTable("messages", (table) => {
        table.increments("id");
        table.string("mail");
        table.integer("date");
        table.string("text");
    })
    .then(() => console.log("table messages created"))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        sqlite.destroy();
    });
