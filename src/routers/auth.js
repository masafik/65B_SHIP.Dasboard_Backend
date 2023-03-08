
import express from 'express';
import { login, loginAd, logout, mydata, exampleLogin } from '../handlers/auth.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import basicAuth from '../preHandlers/basic_auth.js';
import authshema from '../models/Auth/schema.auth.js'
import validateSchema from '../preHandlers/schema_validate.js';

let authRouters = express.Router();

authRouters.post('/login',
    validateSchema(authshema['/api/auth/login'].post.parameters),
    login)
authRouters.post('/login/ad',
    validateSchema(authshema['/api/auth/login/ad'].post.parameters),
    loginAd)

authRouters.get('/logout', check_jwt, logout)
authRouters.get('/mydata', check_jwt, mydata)
authRouters.post('/example/login', exampleLogin)

export { authRouters, authshema }
