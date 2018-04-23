const restful = require('node-restful')

const mongoose = restful.mongoose

const grupoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true }
})

module.exports = restful.model('Grupo', grupoSchema)