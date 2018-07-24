const _ = require('lodash')
const bcrypt = require('bcrypt')
const database = require('../../../config/database')

function login({email, senha, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase
    const connection = database.getConnection()

    connection.query(
    `select usu.nome nome_usuario, usu.sobrenome sobrenome_usuario,
    usu.email, usu.senha,
    grupos.id id_grupo,
    grupos.nome nome_grupo
    from usuarios usu
    join grupos on grupos.id = usu.fk_id_grupo
    where email = ? AND ativo = true`, [email],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        let informacoesUsuario = {}
        if (results) {
            if (results.length > 0) {
                if (!bcrypt.compareSync(senha, results[0].senha)) {
                    next({informacoesUsuario: null})
                    return
                }

                informacoesUsuario = {
                    email: results[0].email,
                    nome: results[0].nome_usuario,
                    grupo: {
                        id: results[0].id_grupo,
                        nome: results[0].nome_grupo,
                    }
                }

                next({informacoesUsuario})
            } else {
                next({informacoesUsuario: null})
            }
        } else {
            next({informacoesUsuario: null})
        }
    })

    connection.end()
}

function cadastrar({usuario, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {nome, sobrenome, email, senha, fkIdGrupo} = usuario

    const connection = database.getConnection()

    connection.query(
    `INSERT INTO usuarios (nome, sobrenome, email, senha, fk_id_grupo)
     VALUES (?, ?, ?, ?, ?)`, [nome, sobrenome, email, senha, fkIdGrupo],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next(results)
    })
}

function alterarSenha({senha, id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
    `UPDATE usuarios
     SET senha = ?
     WHERE id = ?`, [senha, id],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next(results)
    })
}

function atualizar({usuario, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const {id, nome, sobrenome, email, fkIdGrupo } = usuario

    const connection = database.getConnection()

    connection.query(
    `UPDATE usuarios
     SET nome = ?,
         sobrenome = ?,
         email = ?,
         fk_id_grupo = ?
     WHERE id = ?`, [nome, sobrenome, email, fkIdGrupo, id],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next(results)
    })
}

function excluir({id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
    `UPDATE usuarios
     SET ativo = false
     WHERE id = ?`, [id],
    function (err, results) {
        if (err) {
            nextErroBase({ erroBanco: err.sqlMessage })
            return
        }

        next(results)
    })
}

function obterPorId({ id, next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
        `select usu.nome nome_usuario, usu.sobrenome sobrenome_usuario, usu.email,
         grupos.id id_grupo, grupos.nome nome_grupo
         from usuarios usu
         join grupos on grupos.id = usu.fk_id_grupo
         where usu.id = ?`, [id],
        function (err, usuarios) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (usuarios) {
                next({usuario: usuarios.length == 1 ? usuarios[0] : null})
            } else {
                next({usuario: null})
            }
    })
}

function listar({ next, nextErroBase }) {
    next = !next ? () => {} : next
    nextErroBase = !nextErroBase ? () => {} : nextErroBase

    const connection = database.getConnection()

    connection.query(
        `select usu.nome nome_usuario, usu.sobrenome sobrenome_usuario, usu.email,
         grupos.id id_grupo, grupos.nome nome_grupo
         from usuarios usu
         join grupos on grupos.id = usu.fk_id_grupo`,
        function (err, usuarios) {
            if (err) {
                nextErroBase({ erroBanco: err.sqlMessage })
                return
            }

            if (usuarios) {
                let usuariosJson = usuarios.map((usuario) => {
                    return {
                        id: usuario.id,
                        nome: usuario.nome_usuario,
                        email: usuario.email,
                        grupo: {
                            id: usuario.id_grupo,
                            nome: usuario.nome_grupo,
                        }
                    }
                })
                next({usuarios: usuariosJson})
            }
    })
}

module.exports = {
    login, cadastrar, atualizar, excluir, listar, obterPorId, alterarSenha
}