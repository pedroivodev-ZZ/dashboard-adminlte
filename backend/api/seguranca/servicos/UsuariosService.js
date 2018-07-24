const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const usuariosDao = require('../../../api/seguranca/base/UsuariosDao')

const UsuariosService = express.Router()
.get('/login', (req, res) => {
    usuariosDao.login({
        email: req.query.email,
        senha: req.query.senha,
        next: ({informacoesUsuario}) => {
            if (informacoesUsuario) {
                res.json({responseStatus:1, usuario: informacoesUsuario})
            } else {
                res.json({responseStatus:-2, usuario: informacoesUsuario})
            }
        },
        nextErroBase: ({erroBanco}) => { }
    })
})
.get('/', (req, res) => {
    usuariosDao.listar({
        next: ({usuarios}) => {
            res.json({responseStatus:1, usuarios})
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})
.get('/:id', (req, res, next) => {
    //verifica se está sendo requisitada uma url ou apenas passando um valor pro banco buscar
    if (!isNaN(req.params.id)) {
        usuariosDao.listar({
            id: req.param.id,
            next: ({usuario}) => {
                res.json({responseStatus:1, usuario})
            },
            nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
        })
    } else {
        next()
    }
})
.put('/:id', (req, res, next) => {
    //verifica se está sendo requisitada uma url ou apenas passando um valor pro banco buscar
    if (!isNaN(req.params.id)) {
        usuariosDao.atualizar({
            id: req.param.id,
            usuario: req.body,
            next: () => {
                res.json({responseStatus:1})
            },
            nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
        })
    } else {
        next()
    }
})
.put('/alterar_senha/:id', (req, res) => {
    const salt = bcrypt.genSaltSync()

    const senha = bcrypt.hashSync(req.body.senha, salt)

    usuariosDao.alterarSenha({
        id: req.param.id,
        senha,
        next: () => {
            res.json({responseStatus:1})
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})
.delete('/:id', (req, res) => {
    usuariosDao.excluir({
        id: req.param.id,
        next: () => {
            res.json({responseStatus:1})
        },
        nextErroBase: ({erroBanco}) => {console.log(erroBanco)}
    })
})
.post('/', (req, res) => {
    let usuario = req.body
    const { senha } = usuario
    const salt = bcrypt.genSaltSync()

    usuario.senha = bcrypt.hashSync(senha, salt)

    usuariosDao.cadastrar({
        usuario,
        next: ({usuario}) => {
            res.json({responseStatus:1, usuario})
        },
        nextErroBase: ({erroBanco}) => { }
    })
})

module.exports = UsuariosService