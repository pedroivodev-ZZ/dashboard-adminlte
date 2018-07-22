const _ = require('lodash')
const express = require('express')
const acessosDao = require('../base/AcessosDao')

const Acessos = express.Router()
.get('/', (req, res) => {
    acessosDao.listar({
        next: ({acessos}) => {
            res.json({responseStatus:1, acessos})
        }
    })
})
.post('/', (req, res) => {
    acessosDao.cadastrar({
        acesso: req.body,
        next: ({acesso}) => {
            res.json({responseStatus:1, acesso})
        }
    })
})
.put('/:id', (req, res) => {
    acessosDao.atualizar({
        acesso: req.body,
        id: req.params.id,
        next: ({status}) => {
            res.json({responseStatus:1 })
        }
    })
})
.delete('/:id', (req, res) => {
    acessosDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json({responseStatus:1 })
        }
    })
})
.get('/:id', (req, res, next) => {
    //verifica se está sendo requisitada uma url ou apenas passando um valor pro banco buscar
    if (!isNaN(req.params.id)) {
        acessosDao.obterPorId({
            id: req.params.id,
            next: ({acesso}) => {
                res.json({responseStatus:1, acesso})
            }
        })
    } else {
        next()
    }
})
.get('/telas_por_grupo', (req, res) => {
    acessosDao.listarTelasPorGrupo({
        fkIdGrupo: req.query.id_grupo,
        next: ({telas}) => {
            res.json({responseStatus:1, telas})
        }
    })
})

module.exports = Acessos