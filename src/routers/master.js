
import express from 'express';
import { pttstaffcodeAll, subareaAll, wpmSubareaAll } from '../handlers/master.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import schema from '../models/Master/schema.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let masterRouters = express.Router();

masterRouters.get('/pttstaffcode/all',
    csrfProtect,
    check_jwt,
    pttstaffcodeAll)

masterRouters.get('/subarea/all',
    csrfProtect,
    check_jwt,
    subareaAll)

masterRouters.get('/wpmsubarea/all',
    csrfProtect,
    check_jwt,
    wpmSubareaAll)

export { masterRouters, schema }
