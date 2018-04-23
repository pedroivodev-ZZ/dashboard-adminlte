module.exports = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')

    /*if (req.get('origin') != "http://localhost:3004") {
        res.send(404)
    }*/

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
}