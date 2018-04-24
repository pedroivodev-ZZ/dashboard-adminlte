const _ = require('lodash')
const Usuarios = require('../base/Usuarios')
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
})

module.exports = Usuarios