const restful = require('node-restful')

const mongoose = restful.mongoose

const grupoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true }
})

const telaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    path: { type: String, required: true }
})

const acessoSchema = new mongoose.Schema({
    tela: telaSchema,
    grupo: grupoSchema
})

module.exports = restful.model('Acesso', acessoSchema)