//const _ = require('lodash')
const express = require('express')
const database = require('../../../config/database')
const Telas = express.Router()

Telas.get('', (req, res) => {
    let connection = database.getConnection()

    connection.query('select * from telas', function (err, results) {

        let telasRaiz = results.map((indice, tela) => !tela.fk_id_tela)

        res.json(results)
    })

    connection.end()
})

Telas.get('/filtrar', (req, res) => {
    let raiz = false
    if (req.query.raiz != undefined) {
        raiz = (req.query.raiz == 'true')
    }

    let connection = database.getConnection()

    connection.query(`select * from telas ${raiz ? 'where fk_id_tela is null' : ''}`, function (err, results) {
        res.json(results)
    })

    connection.end()
})

Telas.post('', (req, res) => {
    let tela = req.body;

    let connection = database.getConnection()

    connection.query(
       `insert into telas(nome, path, ordem_exibicao${tela.idTelaMae ? ', fk_id_tela' : ''})
        values('${tela.nome}', '${tela.path}', '${tela.ordemExibicao}'${tela.idTelaMae ? ', ' + tela.idTelaMae : ''})`,
        function (err, results) {
            res.json({ status: 1 })
        })

    connection.end()
})

Telas.put('/:id', (req, res) => {
    let tela = req.body;
    let connection = database.getConnection()

    connection.query(
        `update telas set
            nome = '${tela.nome}',
            path = '${tela.path}',
            ordem_exibicao = '${tela.ordemExibicao}'
            fk_id_tela = ${!tela.idTelaMae ? 'null' : tela.idTelaMae}
         where id = ${req.params.id}`, function (err, results) {
            res.json({ status: 1 })
        })

    connection.end()
})

Telas.delete('/:id', (req, res) => {
    let connection = database.getConnection()

    connection.query(
        `delete from telas where id = ${req.params.id}`,
        function (err, results) {
            res.json({ status: 1 })
        })

    connection.end()
})

Telas.get('/:id', (req, res) => {
    let connection = database.getConnection()

    connection.query(`select * from telas where id = ${req.params.id}`, function (err, results) {
        res.json(results)
    })

    connection.end()
})

module.exports = Telas
/*const Telas = require('../base/Telas')

Telas.methods(['get', 'post', 'put', 'delete'])
Telas.updateOptions({ new: true, runValidators: true })

Telas
    .after('get', sendErrorsOrNext)
    .after('post', sendErrorsOrNext)
    .after('put', sendErrorsOrNext)
    .after('delete', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle
    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        console.log(JSON.stringify(bundle.errors))
        res.status(500).json({ errors })
    } else {
        console.log('segue o baile')
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []

    _.forIn(nodeRestfulErrors, error => errors.push(error.message))

    return errors;
}

Telas.route('filtar', (req, res, next) => {
    if (req.query.raiz != undefined) {
        req.query.raiz = (req.query.raiz == 'true')
    }

    Telas.find(req.query, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(_.defaults(result, {}))
        }
    })
})

Telas.route('count', (req, res, next) => {
    Telas.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})*/

module.exports = Telas