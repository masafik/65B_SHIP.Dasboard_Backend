
import express from 'express';
import { all } from '../handlers/workpermit.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import workPermitSchema from '../models/WorkPermit/schema.workPermit.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let workPermitRouters = express.Router();

workPermitRouters.get('/all', csrfProtect, check_jwt, all)

export { workPermitRouters, workPermitSchema }
