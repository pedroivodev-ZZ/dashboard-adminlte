const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const database = require('../../../config/database')
const Usuarios = express.Router()

Usuarios.get('/teste', (req, res, next) => {
    let params = req.query

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(params.senha, salt)

    res.json({senha: passwordHash})
})

Usuarios.get('/login', (req, res, next) => {
    let params = req.query

    let connection = database.getConnection()

    connection.query(
    `select usu.nome nome_usuario, usu.sobrenome sobrenome_usuario,
    usu.email, usu.senha,
    grupos.id id_grupo,
    grupos.nome nome_grupo,
    telas.id id_tela,
    telas.nome nome_tela,
    telas.fk_id_tela,
    telas.path
    from usuarios usu
    join acessos on acessos.fk_id_grupo = usu.fk_id_grupo
    join grupos on grupos.id = acessos.fk_id_grupo
    join telas on telas.id = acessos.fk_id_tela
    where email = '${params.email}'`,
    function (err, results) {
        if (err) {
            //tartar erro
        }

        let retorno = {}
        if (results) {
            if (results.length > 0) {
                if (!bcrypt.compareSync(params.senha, results[0].senha)) {
                    res.json({erro: 'Login Inválido'})
                    return
                }

                retorno = {
                    email: results[0].email,
                    nome: results[0].nome_usuario,
                    grupo: {
                        nome: results[0].nome_grupo,
                    },
                    acessos: []
                }
            }

            let telasPermitidas = []
            for (let i = 0; i < results.length; i++) {
                telasPermitidas.push({
                    id: results[i].id_tela,
                    nome: results[i].nome_tela,
                    fk_id_tela: results[i].fk_id_tela,
                    path: results[i].path,
                })
            }

            let idTelasAchadas = []

            let telasPermitidasOrdenadas = telasPermitidas.filter((tela, indice) => {
                if (!tela.fk_id_tela) {
                    idTelasAchadas.push(tela.id)
                    return true
                }

                return false
            })

            let telasRestantes = getListaAtualizada(telasPermitidas, idTelasAchadas)
            while (telasRestantes.length != 0) {
                searchInTelas(telasPermitidasOrdenadas, telasRestantes[0])

                idTelasAchadas.push(telasRestantes[0].id)
                telasRestantes = getListaAtualizada(telasRestantes, idTelasAchadas)
            }

            retorno.telasPermitidas = telasPermitidasOrdenadas
        }

        res.json(_.defaults(retorno, {}))
    })

    connection.end()
})

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

module.exports = Usuarios
/*const Usuarios = require('../base/Usuarios')
const Acessos = require('../base/Acessos')

Usuarios.methods(['get', 'post', 'put', 'delete'])
Usuarios.updateOptions({ new: true, runValidators: true })

Usuarios
    .after('get', sendErrorsOrNext)
    .after('post', sendErrorsOrNext)
    .after('put', sendErrorsOrNext)
    .after('delete', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle
    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []

    _.forIn(nodeRestfulErrors, error => errors.push(error.message))

    return errors;
}

Usuarios.route('count', (req, res, next) => {
    Usuarios.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

Usuarios.route('login', (req, res, next) => {
    Usuarios.findOne({
        'email': req.query.email,
        'senha': req.query.senha
    }, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            Acessos.find({
                'grupo._id': result.grupo._id
            }, (errorAcesso, resultAcesso) => {
                if (errorAcesso) {
                    res.status(500).json({ errors: [errorAcesso] })
                } else {
                    let retorno = {
                        _id: result._id,
                        email: result.email,
                        nome: result.nome,
                        grupo: result.grupo,
                        acessos: resultAcesso
                    }

                    res.json(_.defaults(retorno, {}))
                }
            })
        }
    })
})*/