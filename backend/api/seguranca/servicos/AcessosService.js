const express = require('express')
const acessosDao = require('../base/AcessosDao')

const Acessos = express.Router()
.get('/', (req, res) => {
    acessosDao.listar({
        next: ({acessos}) => {
            res.json(acessos)
        }
    })
})
.post('/', (req, res) => {
    acessosDao.cadastrar({
        acesso: req.body,
        next: ({acesso}) => {
            res.json(acesso)
        }
    })
})
.put('/:id', (req, res) => {
    acessosDao.atualizar({
        acesso: req.body,
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.delete('/:id', (req, res) => {
    acessosDao.excluir({
        id: req.params.id,
        next: ({status}) => {
            res.json(status)
        }
    })
})
.get('/:id', (req, res) => {
    acessosDao.obterPorId({
        id: req.params.id,
        next: ({acesso}) => {
            res.json(acesso)
        }
    })
})
.get('/acessos_por_grupo', (req, res) => {
    acessosDao.listarPorGrupo({
        fkIdGrupo: req.query.id_grupo,
        next: ({}) => {
            res.json(tela)
        }
    })
})

module.exports = Acessos