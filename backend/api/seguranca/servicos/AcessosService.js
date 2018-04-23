const _ = require('lodash')
const Acessos = require('../base/Acessos')

function obterAcessos(req, res) {
    Acessos.find({
        'grupo._id': req.query.grupo
    }, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(_.defaults(result, {}))
        }
    })
}

module.exports = { obterAcessos }