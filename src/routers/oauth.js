
import express from 'express';
import { token } from '../handlers/auth.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import basicAuth from '../preHandlers/basic_auth.js';
import authshema from '../models/Auth/schema.auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let oauthRouters = express.Router();

oauthRouters.post('/token',
    validateSchema(authshema['/api/oauth/token'].post.parameters),
    token)


export { oauthRouters, authshema }
