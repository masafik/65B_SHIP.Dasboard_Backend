
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/user.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import userSchema from '../models/User/schema.user.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let userRouters = express.Router();

userRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
userRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
userRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
userRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
userRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { userRouters, userSchema }
