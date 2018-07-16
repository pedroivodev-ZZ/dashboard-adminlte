const apiUrl = '/api'

const acessosService = require('../api/seguranca/servicos/AcessosService')
const telasService = require('../api/seguranca/servicos/TelasService')
const usuariosService = require('../api/seguranca/servicos/UsuariosService')
const gruposService = require('../api/seguranca/servicos/GruposService')

module.exports = (server) => {
  server
  .use(`${apiUrl}/telas`, telasService)
  .use(`${apiUrl}/usuarios`, usuariosService)
  .use(`${apiUrl}/grupos`, gruposService)
  .use(`${apiUrl}/acessos`, acessosService)
}