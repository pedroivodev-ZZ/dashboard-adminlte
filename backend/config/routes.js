//const express = require('express')
const apiUrl = '/api'

const telasService = require('../api/seguranca/servicos/TelasService')
const usuariosService = require('../api/seguranca/servicos/UsuariosService')

module.exports = (server) => {
  server.use(`${apiUrl}/telas`, telasService)
  server.use(`${apiUrl}/usuarios`, usuariosService)
}