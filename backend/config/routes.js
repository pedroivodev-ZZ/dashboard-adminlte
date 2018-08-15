const apiUrl = '/api'

const acessosService = require('../api/seguranca/rotas/AcessosService')
const telasService = require('../api/seguranca/rotas/TelasService')
const usuariosService = require('../api/seguranca/rotas/UsuariosService')
const gruposService = require('../api/seguranca/rotas/GruposService')

module.exports = (server) => {
  server
  .use(`${apiUrl}/telas`, telasService)
  .use(`${apiUrl}/usuarios`, usuariosService)
  .use(`${apiUrl}/grupos`, gruposService)
  .use(`${apiUrl}/acessos`, acessosService)
}