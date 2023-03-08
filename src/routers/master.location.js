
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/location.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import locationSchema from '../models/Master/Location/schema.location.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let locationRouters = express.Router();

locationRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
locationRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
locationRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
locationRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
locationRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { locationRouters, locationSchema }
