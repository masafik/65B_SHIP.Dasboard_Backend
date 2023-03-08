
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/application.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import applicationSchema from '../models/Application/schema.application.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let applicationRouters = express.Router();

applicationRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
applicationRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
applicationRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
applicationRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
applicationRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { applicationRouters, applicationSchema }
