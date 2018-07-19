const _ = require('lodash')
const database = require('../../../config/database')

function cadastrar({acesso, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {fkIdTela, fkIdGrupo} = acesso

    const connection = database.getConnection()

    connection.query(
    `INSERT INTO acessos (fk_id_tela, fk_id_grupo)
     VALUES (?, ?)`, [fkIdTela, fkIdGrupo],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next({
            acesso: {
                id: results.insertId,
                fkIdTela, fkIdGrupo
            }
        })
    })
}

function atualizar({acesso, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {id, fkIdTela, fkIdGrupo} = acesso

    const connection = database.getConnection()

    connection.query(
    `UPDATE acessos
     SET fk_id_tela = '${fkIdTela}',
         fk_id_grupo = ${fkIdGrupo}
     WHERE id = ${id}`,
    function (err) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next({ status: 1 })
    })
}

function excluir({id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(`DELETE FROM acessos WHERE id = ${id}`,
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

    connection.query(
        `select acessos.id id, telas.id id_tela, telas.nome nome_tela, telas.path, telas.path,
         grupos.id id_grupo, grupos.nome nome_grupo
         from acessos
         join grupos on grupos.id = acessos.fk_id_grupo
         join telas on telas.id = acessos.fk_id_tela
         where acessos.id = ${id}`,
        function (err, usuarios) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (usuarios) {
                next({acesso: usuarios.length == 1 ? usuarios[0] : null})
            } else {
                next({acesso: null})
            }
        }
    )
}

function listar({ next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
        `select acessos.id id, telas.id id_tela, telas.nome nome_tela, telas.path,
        grupos.id id_grupo, grupos.nome nome_grupo
        from acessos
        join grupos on grupos.id = acessos.fk_id_grupo
        join telas on telas.id = acessos.fk_id_tela`,
        function (err, acessos) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (acessos) {
                next({acessos})
            }
        }
    )
}

function listarPorGrupo({ fkIdGrupo, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
        `select acessos.id id, telas.id id_tela, telas.nome nome_tela, telas.path, telas.path,
        grupos.id id_grupo, grupos.nome nome_grupo
        from acessos
        join grupos on grupos.id = acessos.fk_id_grupo
        join telas on telas.id = acessos.fk_id_tela
        where acessos.fk_id_grupo = ?`, [fkIdGrupo],
        function (err, acessos) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (acessos) {
                next({acessos})
            }
        }
    )
}

/*function listarTelasPorUsuario({usuario, next, nextErroBanco}) {
    next = !next ? () => {} : next
    nextErroBanco = !nextErroBanco ? () => {} : nextErroBanco

    const connection = database.getConnection()

    connection.query(`select * from telas`, function (err, results) {
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
}*/

module.exports = {
    cadastrar, atualizar, excluir, listar, listarPorGrupo, obterPorId
}