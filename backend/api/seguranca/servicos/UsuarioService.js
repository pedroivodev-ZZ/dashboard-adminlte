const _ = require('lodash')
const Usuarios = require('../base/Usuarios')
const Acessos = require('../base/Acessos')

function login(req, res) {
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
}

module.exports = { login }