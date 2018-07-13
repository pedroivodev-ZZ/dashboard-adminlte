const express = require('express')
const telasDao = require('../base/TelasDao')
const Telas = express.Router()

Telas.get('', (req, res) => {
    telasDao.listar({
        next: ({telas}) => {
            res.json(telas)
        }
    })
})

Telas.get('/filhas', (req, res) => {
    telasDao.listarFilhas({
        idMae: req.query.id_mae,
        next: ({telas}) => {
            res.json(telas)
        }
    })
})

Telas.get('/arvore', (req, res) => {
    telasDao.listarComoArvore({
        next: ({telas}) => {
            res.json(telas)
        }
    })
})

Telas.post('', (req, res) => {
    telasDao.cadastrar({
        tela: req.body,
        next: ({status}) => {
            res.json(status)
        }
    })
})

Telas.put('/:id', (req, res) => {
    telasDao.alterar({
        id: req.params.id,
        tela: req.body,
        next: ({status}) => {
            res.json(status)
        }
    })
})

Telas.delete('/:id', (req, res) => {
    telasDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})

Telas.get('/:id', (req, res) => {
    telasDao.obterPorId({
        id: req.params.id,
        next: ({tela}) => {
            res.json(tela)
        }
    })
})

module.exports = Telas