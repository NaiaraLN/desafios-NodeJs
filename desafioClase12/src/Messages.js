const fs = require('fs');

class Messages {
    constructor (name){
        this.fileName = name
    }

    save = async (message) => {
        try {
            if (fs.existsSync(this.fileName)) {
                let allMessages = await this.getAll()
                allMessages.push(message)
                await fs.promises.writeFile(this.fileName, JSON.stringify(allMessages));
                return message
            } else {
                await fs.promises.writeFile(this.fileName, JSON.stringify([message]))
                return message
            }
        } catch (error) {
            throw 'No se pudo guardar' + error;
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                const messages = await fs.promises.readFile(this.fileName)
                let message = JSON.parse(messages)
                return message
            }
        } catch (error) {
            throw "No se encontró el archivo" + error;
        }
    }

}



module.exports = Messages