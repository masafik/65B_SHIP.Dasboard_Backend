
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/scaffoldingtype.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import scaffoldingTypeSchema from '../models/Master/ScaffoldingType/schema.scaffoldingType.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})


let scaffoldingTypeRouters = express.Router();

scaffoldingTypeRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
scaffoldingTypeRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
scaffoldingTypeRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
scaffoldingTypeRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
scaffoldingTypeRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { scaffoldingTypeRouters, scaffoldingTypeSchema }
