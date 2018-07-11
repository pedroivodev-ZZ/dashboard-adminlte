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

function listar({}) {
    let connection = database.getConnection()

    connection.query('select * from telas', function (err, results) {
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

        res.json(telas)
    })

    connection.end()
}

function cadastrar({tela, next, nextErroBanco}) {
    let tela = req.body;

    let connection = database.getConnection()

    connection.query(
       `insert into telas(nome, path, ordem_exibicao${tela.idTelaMae ? ', fk_id_tela' : ''})
        values('${tela.nome}', '${tela.path}', '${tela.ordemExibicao}'${tela.idTelaMae ? ', ' + tela.idTelaMae : ''})`,
        function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function atualizar({id, tela, next, nextErroBanco}) {
    let connection = database.getConnection()

    connection.query(
        `update telas set
            nome = '${tela.nome}',
            path = '${tela.path}',
            ordem_exibicao = '${tela.ordemExibicao}'
            fk_id_tela = ${!tela.idTelaMae ? 'null' : tela.idTelaMae}
         where id = ${id}`,
         function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function excluir({id, next, nextErroBanco}) {
    let connection = database.getConnection()

    connection.query(
        `delete from telas where id = ${req.params.id}`,
        function (err, results) {
            if (err) {
                nextErroBanco({ erroBanco: err })
                return
            }

            next({ status: 1 })
        })

    connection.end()
}

function obterPorId({id, next, nextErroBanco}) {
    let connection = database.getConnection()

    connection.query(`select * from telas where id = ${id}`,
    function (err, results) {
        if (err) {
            nextErroBanco({ erroBanco: err })
            return
        }

        next({ tela: results })
    })

    connection.end()
}

module.exports = {
    cadastrar, listar, excluir, atualizar, obterPorId, cadastrar
}