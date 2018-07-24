const _ = require('lodash')
const database = require('../../../config/database')

function cadastrar({grupo, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {nome} = grupo

    const connection = database.getConnection()

    connection.query('INSERT INTO grupos (nome) VALUES (?)', [nome],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next({
            grupo: {
                id: results.insertId,
                nome
            }
        })
    })
}

function atualizar({grupo, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {id, nome} = grupo

    const connection = database.getConnection()

    connection.query('UPDATE grupos SET nome = ? WHERE id = ?', [nome, id],
    function (err) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next({ grupo })
    })
}

function excluir({id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query('DELETE FROM grupos WHERE id = ?', [id],
    function (err) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next({ status: 1 })
    })
}

function obterPorId({ id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query('select grupos.id, grupos.nome from grupos where grupos.id = ?', [id],
        function (err, grupos) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (grupos) {
                next({grupo: grupos.length == 1 ? grupos[0] : null})
            } else {
                next({grupo: null})
            }
        }
    )
}

function listar({ next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query('select grupos.id, grupos.nome from grupos',
        function (err, grupos) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (grupos) {
                next({grupos})
            }
        }
    )
}

module.exports = {
    cadastrar, atualizar, excluir, listar, obterPorId
}