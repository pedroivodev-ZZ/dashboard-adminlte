const restful = require('node-restful')

const mongoose = restful.mongoose

const grupoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true }
})

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    grupo: grupoSchema
})

module.exports = restful.model('Usuario', usuarioSchema)