const express = require('express')
const acessosService = require('../api/seguranca/servicos/AcessosService')
const usuarioService = require('../api/seguranca/servicos/UsuarioService')

module.exports = function (server) {
    //API routes
    const router = express.Router()
    server.use('/api', router)

    //const billingCycleService = require('../api/billingCycle/billingCycleService')
    //billingCycleService.register(router, '/billingCycles')

    router.route('/obter_acessos').get(acessosService.obterAcessos)
    router.route('/login').get(usuarioService.login)
}