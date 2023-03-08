
import express from 'express';
import { all } from '../handlers/accesscontrol.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import accessControlSchema from '../models/AccessControl/schema.accessControl.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})


let accessControlRouters = express.Router();

accessControlRouters.get('/all', csrfProtect, check_jwt, all)

export { accessControlRouters, accessControlSchema }
