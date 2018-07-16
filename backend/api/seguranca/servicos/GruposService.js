const express = require('express')
const gruposDao = require('../base/GruposDao')

const Grupos = express.Router()
.get('/', (req, res) => {
    gruposDao.listar({
        next: ({grupos}) => {
            res.json(grupos)
        }
    })
})
.post('/', (req, res) => {
    gruposDao.cadastrar({
        grupo: req.body,
        next: ({grupo}) => {
            res.json(grupo)
        }
    })
})
.put('/:id', (req, res) => {
    gruposDao.atualizar({
        grupo: req.body,
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.delete('/:id', (req, res) => {
    gruposDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.get('/:id', (req, res) => {
    gruposDao.obterPorId({
        id: req.params.id,
        next: ({grupo}) => {
            res.json(grupo)
        }
    })
})

module.exports = Grupos