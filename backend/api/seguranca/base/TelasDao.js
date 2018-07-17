const database = require('../../../config/database')

function searchInTelas(telas, telaFilha) {
    for (const i in telas) {
        if (!telas[i].telas) {
            telas[i].telas = []
        }

        if (telaFilha.fk_id_tela == telas[i].id) {
            telas[i].telas.push(telaFilha)
            break;
        }

        if (telas[i].telas.length > 0) {
            searchInTelas(telas[i].telas, telaFilha)
        }
    }
}

function getListaAtualizada(lista, itensExcluir) {
    return lista.filter((item, index) => {
        return itensExcluir.indexOf(item.id) == -1
    })
}

function listar({next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query('select * from telas', function (err, results) {
        if (err) {
            nextErroBanco({erroBanco: err.sqlMessage})
            return
        }

        next({telas: results})
    })

    connection.end()
}

function listarFilhas({idMae, next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query('select * from telas WHERE fk_id_tela = ?', [idMae], function (err, results) {
        if (err) {
            nextErroBanco({erroBanco: err.sqlMessage})
            return
        }

        next({telas: results})
    })

    connection.end()
}

function listarComoArvore({next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query('select * from telas', function (err, results) {
        if (err) {
            nextErroBanco({erroBanco: err.sqlMessage})
            return
        }

        let idTelasAchadas = []

        let telas = results.filter((tela, indice) => {
            if (!tela.fk_id_tela) {
                idTelasAchadas.push(tela.id)
                return true
            }

            return false
        })

        let telasRestantes = getListaAtualizada(results, idTelasAchadas)
        while (telasRestantes.length != 0) {
            searchInTelas(telas, telasRestantes[0])

            idTelasAchadas.push(telasRestantes[0].id)
            telasRestantes = getListaAtualizada(telasRestantes, idTelasAchadas)
        }

        next({telas})
    })

    connection.end()
}

function cadastrar({tela, next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const {nome, path, idTelaMae} = tela

    const connection = database.getConnection()

    connection.query(
       `insert into telas(nome, path, fk_id_tela)
        values(?, ?, ?)`, [nome, path, idTelaMae],
        function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err.sqlMessage })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function alterar({id, tela, next, nextErroBanco}) {

    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const { nome, path, idTelaMae} = tela

    const connection = database.getConnection()

    connection.query(
        `update telas set
            nome = ?,
            path = ?,
            fk_id_tela = ?
         where id = ?`, [nome, path, !idTelaMae ? null : idTelaMae, id],
         function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err.sqlMessage })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function excluir({id, next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query('delete from telas where id = ?', [id],
        function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err.sqlMessage })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function obterPorId({id, next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query('select * from telas where id = ?', [id],
    function (err, results) {
        if (err) {
            nextErroBanco({ erroBanco: err.sqlMessage })
            return
        }

        next({ tela: results })
    })

    connection.end()
}

module.exports = {
    cadastrar, listar, listarFilhas, listarComoArvore, excluir, alterar, obterPorId
}