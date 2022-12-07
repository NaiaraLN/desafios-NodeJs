const knexLib = require("knex")

class ClientSql {
    constructor(config, table) {
        this.knex = knexLib(config),
        this.table = table
    }
    createTable() {
        return this.knex.schema.dropTableIfExists(`${this.table}`)
        .finally(() => {
            if (this.table == 'products') {
                return this.knex.schema.createTable(`${this.table}`, table => {
                table.increments('id').primary();
                table.string('title', 50).notNullable();
                table.float('price');
                table.string('thumbnail');
                })
            } else {
                return this.knex.schema.createTable(`${this.table}`, table => {
                    table.increments("id");
                    table.string("mail");
                    table.integer("date");
                    table.string("text");
                })
            }
        })
    }

    insertAll(entidad) {
        return this.knex(`${this.table}`).insert(entidad)
    }

    listAll() {
        return this.knex(`${this.table}`).select('*')
    }

    deleteById(id) {
        return this.knex.from(`${this.table}`).where('id', id).del()
    }

    close() {
        this.knex.destroy();
    }
}

module.exports = ClientSql