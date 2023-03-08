
import express from 'express';
import { all } from '../handlers/scaffolding.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import scaffoldingSchema from '../models/Scaffolding/schema.scaffolding.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let scaffoldingRouters = express.Router();

scaffoldingRouters.get('/all', csrfProtect, check_jwt, all)

export { scaffoldingRouters, scaffoldingSchema }
