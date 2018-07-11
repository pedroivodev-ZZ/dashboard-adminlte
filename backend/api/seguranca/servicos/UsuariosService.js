const _ = require('lodash')
const express = require('express')
const usuariosDao = require('../../../api/seguranca/base/UsuariosDao')
const Usuarios = express.Router()

Usuarios.get('/login', (req, res) => {
    usuariosDao.login({
        login: req.params.login,
        senha: req.params.senha,
        next: ({informacoesUsuario}) => {
            if (informacoesUsuario) {
                res.json(_.defaults(informacoesUsuario, {}))
            } else {
                res.json({erro: 'Login Inválido'})
            }
        },
        nextErroBase: ({erroBanco}) => { }
    })
})

module.exports = Usuarios