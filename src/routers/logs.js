
import express from 'express';
import { all } from '../handlers/logs.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import logsSchema from '../models/Logs/schema.logs.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})


let logsRouters = express.Router();

logsRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)

export { logsRouters, logsSchema }
