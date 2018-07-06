const express = require('express')
const apiUrl = '/api'

const clienteService = require('../api/seguranca/servicos/TelasService')

module.exports = (server) => {
  server.use(`${apiUrl}/telas`, clienteService)
}

/*const express = require('express')
const acessosService = require('../api/seguranca/servicos/AcessosService')
const telasService = require('../api/seguranca/servicos/TelasService')
const gruposService = require('../api/seguranca/servicos/GruposService')
const usuariosService = require('../api/seguranca/servicos/UsuariosService')

module.exports = function (server) {
    const router = express.Router()
    server.use('/api', router)

    telasService.register(router, '/telas')
    gruposService.register(router, '/grupos')
    usuariosService.register(router, '/usuarios')

    router.route('/obter_acessos').get(acessosService.obterAcessos)
}*/