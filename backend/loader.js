const server = require('./config/server')
require('./config/database')
const routes = require('./config/routes')
routes(server)