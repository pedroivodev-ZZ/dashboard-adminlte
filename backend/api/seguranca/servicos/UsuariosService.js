const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')

const usuariosDao = require('../../../api/seguranca/base/UsuariosDao')
const Usuarios = express.Router()

Usuarios.get('/login', (req, res) => {
    usuariosDao.login({
        email: req.query.email,
        senha: req.query.senha,
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

Usuarios.put('/:id', (req, res) => {
    usuariosDao.atualizar({
        id: req.param.id,
        usuario: req.body,
        next: () => {
            res.json({})
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})

Usuarios.put('/alterar_senha/:id', (req, res) => {
    const salt = bcrypt.genSaltSync()

    const senha = bcrypt.hashSync(req.body.senha, salt)

    usuariosDao.alterarSenha({
        id: req.param.id,
        senha,
        next: () => {
            res.json({})
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})

Usuarios.delete('/:id', (req, res) => {
    usuariosDao.excluir({
        id: req.param.id,
        next: () => {
            res.json({})
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