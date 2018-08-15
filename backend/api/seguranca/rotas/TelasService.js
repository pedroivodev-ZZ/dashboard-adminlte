const express = require('express')
const telasDao = require('../base/TelasDao')

const Telas = express.Router()
.get('/', (req, res) => {
    telasDao.listar({
        next: ({telas}) => {
            res.json({responseStatus:1, telas})
        }
    })
})
.get('/filhas', (req, res) => {
    telasDao.listarFilhas({
        idMae: req.query.id_mae,
        next: ({telas}) => {
            res.json({responseStatus:1, telas})
        }
    })
})
.get('/arvore', (req, res) => {
    telasDao.listarComoArvore({
        next: ({telas}) => {
            res.json({responseStatus:1, telas})
        }
    })
})
.post('/', (req, res) => {
    telasDao.cadastrar({
        tela: req.body,
        next: ({tela}) => {
            res.json({responseStatus:1, tela})
        }
    })
})
.put('/:id', (req, res) => {
    telasDao.alterar({
        id: req.params.id,
        tela: req.body,
        next: ({status}) => {
            res.json({responseStatus:1})
        }
    })
})
.delete('/:id', (req, res) => {
    telasDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json({responseStatus:1})
        }
    })
})
.get('/:id', (req, res) => {
    telasDao.obterPorId({
        id: req.params.id,
        next: ({tela}) => {
            res.json({responseStatus:1, tela})
        }
    })
})

module.exports = Telas