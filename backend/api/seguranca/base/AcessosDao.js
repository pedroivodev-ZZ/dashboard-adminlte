const _ = require('lodash')
const database = require('../../../config/database')
const { getTelasAsTree } = require('../../../api/seguranca/entidades/Telas')

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

        next({ acesso })
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

function listarTelasPorGrupo({ fkIdGrupo, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
        `select telas.id id_tela,
        telas.nome nome_tela,
        telas.fk_id_tela,
        telas.path
        from acessos
        join telas on telas.id = acessos.fk_id_tela
        where acessos.fk_id_grupo = ?`, [fkIdGrupo],
        function (err, telas) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (telas) {

                let telasPermitidas = []
                for (let i = 0; i < telas.length; i++) {
                    telasPermitidas.push({
                        id: telas[i].id_tela,
                        nome: telas[i].nome_tela,
                        fk_id_tela: telas[i].fk_id_tela,
                        path: telas[i].path,
                    })
                }

                next({telas: getTelasAsTree(telasPermitidas)})
            }
        }
    )
}

module.exports = {
    cadastrar, atualizar, excluir, listar, listarTelasPorGrupo, obterPorId
}