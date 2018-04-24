const _ = require('lodash')
const Telas = require('../base/Telas')

Telas.methods(['get', 'post', 'put', 'delete'])
Telas.updateOptions({ new: true, runValidators: true })

Telas
    .after('get', sendErrorsOrNext)
    .after('post', sendErrorsOrNext)
    .after('put', sendErrorsOrNext)
    .after('delete', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle
    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        console.log(JSON.stringify(bundle.errors))
        res.status(500).json({ errors })
    } else {
        console.log('segue o baile')
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []

    _.forIn(nodeRestfulErrors, error => errors.push(error.message))

    return errors;
}

Telas.route('filtar', (req, res, next) => {
    if (req.query.raiz != undefined) {
        req.query.raiz = (req.query.raiz == 'true')
    }

    Telas.find(req.query, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(_.defaults(result, {}))
        }
    })
})

Telas.route('count', (req, res, next) => {
    Telas.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Telas