const express = require('express')
const gruposDao = require('../base/GruposDao')

const Grupos = express.Router()
.get('/', (req, res) => {
    gruposDao.listar({
        next: ({grupos}) => {
            res.json({responseStatus:1, grupos})
        }
    })
})
.post('/', (req, res) => {
    gruposDao.cadastrar({
        grupo: req.body,
        next: ({grupo}) => {
            res.json({responseStatus:1, grupo})
        }
    })
})
.put('/:id', (req, res) => {
    gruposDao.atualizar({
        grupo: req.body,
        id: req.params.id,
        next: ({status}) => {
            res.json({responseStatus:1})
        }
    })
})
.delete('/:id', (req, res) => {
    gruposDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json({responseStatus:1})
        }
    })
})
.get('/:id', (req, res) => {
    gruposDao.obterPorId({
        id: req.params.id,
        next: ({grupo}) => {
            res.json({responseStatus:1, grupo})
        }
    })
})

module.exports = Grupos