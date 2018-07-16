const express = require('express')
const telasDao = require('../base/TelasDao')

const Telas = express.Router()
.get('/', (req, res) => {
    telasDao.listar({
        next: ({telas}) => {
            res.json(telas)
        }
    })
})
.get('/filhas', (req, res) => {
    telasDao.listarFilhas({
        idMae: req.query.id_mae,
        next: ({telas}) => {
            res.json(telas)
        }
    })
})
.get('/arvore', (req, res) => {
    telasDao.listarComoArvore({
        next: ({telas}) => {
            res.json(telas)
        }
    })
})
.post('/', (req, res) => {
    telasDao.cadastrar({
        tela: req.body,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.put('/:id', (req, res) => {
    telasDao.alterar({
        id: req.params.id,
        tela: req.body,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.delete('/:id', (req, res) => {
    telasDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.get('/:id', (req, res) => {
    telasDao.obterPorId({
        id: req.params.id,
        next: ({tela}) => {
            res.json(tela)
        }
    })
})

module.exports = Telas