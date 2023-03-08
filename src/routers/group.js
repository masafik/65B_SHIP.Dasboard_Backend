
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/group.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import groupSchema from '../models/Group/schema.group.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})


let groupRouters = express.Router();

groupRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
groupRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
groupRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
groupRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
groupRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { groupRouters, groupSchema }
