const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const database = require('../../../config/database')

const usuariosDao = require('../../../api/seguranca/base/UsuariosDao')
const Usuarios = express.Router()

Usuarios.get('/login', (req, res) => {
    usuariosDao.login({
        email: req.params.login,
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

Usuarios.get('', (req, res) => {
    usuariosDao.listar({
        next: ({usuarios}) => {
            res.json(usuarios)
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})

Usuarios.put('', (req, res) => {
    usuariosDao.listar({
        next: ({usuarios}) => {
            res.json(usuarios)
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})

Usuarios.delete('', (req, res) => {
    usuariosDao.listar({
        next: ({usuarios}) => {
            res.json(usuarios)
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})

Usuarios.post('', (req, res) => {
    let usuario = req.body
    const { senha } = usuario
    const salt = bcrypt.genSaltSync()

    usuario.senha = bcrypt.hashSync(senha, salt)

    usuariosDao.cadastrar({
        usuario,
        next: () => {
            res.json({})
        },
        nextErroBase: ({erroBanco}) => { }
    })
})

module.exports = Usuarios