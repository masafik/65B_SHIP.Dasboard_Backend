
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/workpermitstatus.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import workpermitStatusSchema from '../models/Master/WorkpermitStatus/schema.workpermitStatus.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let workpermitStatusRouters = express.Router();

workpermitStatusRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
workpermitStatusRouters.get('/byid/:_id',
    csrfProtect, check_jwt,
    byid)
workpermitStatusRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
workpermitStatusRouters.put('/put/:_id',
    parseForm,
    csrfProtect, check_jwt,
    edit
)
workpermitStatusRouters.delete('/delete/:_id',
    csrfProtect, check_jwt,
    destroy
)
export { workpermitStatusRouters, workpermitStatusSchema }
