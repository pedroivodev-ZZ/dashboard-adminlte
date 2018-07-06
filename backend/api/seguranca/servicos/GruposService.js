const _ = require('lodash')
/*const Grupos = require('../base/Grupos')

Grupos.methods(['get', 'post', 'put', 'delete'])
Grupos.updateOptions({ new: true, runValidators: true })

Grupos
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

Grupos.route('count', (req, res, next) => {
    Grupos.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Grupos*/