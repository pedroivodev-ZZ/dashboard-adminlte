const _ = require('lodash')
/*const Acessos = require('../base/Acessos')

Acessos.methods(['get', 'post', 'put', 'delete'])
Acessos.updateOptions({ new: true, runValidators: true })

Acessos
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

Acessos.route('count', (req, res, next) => {
    Acessos.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Acessos*/