const restful = require('node-restful')

const mongoose = restful.mongoose

const telaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    path: { type: String, required: true }
})

module.exports = restful.model('Tela', telaSchema)