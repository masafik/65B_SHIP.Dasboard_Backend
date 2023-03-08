
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/workpermittype.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import workpermitTypeSchema from '../models/Master/WorkpermitType/schema.workpermitType.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let workpermitTypeRouters = express.Router();

workpermitTypeRouters.get('/all',
    csrfProtect, check_jwt,
    all)
workpermitTypeRouters.get('/byid/:_id',
    csrfProtect, check_jwt,
    byid)
workpermitTypeRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
workpermitTypeRouters.put('/put/:_id',
    parseForm,
    csrfProtect, check_jwt,
    edit
)
workpermitTypeRouters.delete('/delete/:_id',
    csrfProtect, check_jwt,
    destroy
)
export { workpermitTypeRouters, workpermitTypeSchema }
