
import express from 'express';
import { scaffolding, people, vehicle, workpermit, equipment, accesscontrol } from '../handlers/integrate.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import integrateSchema from '../models/Integrate/schema.integrate.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let integrateRouters = express.Router();

integrateRouters.get('/scaffolding', csrfProtect, check_jwt, scaffolding)
integrateRouters.get('/people', csrfProtect, check_jwt, people)
integrateRouters.get('/vehicle', csrfProtect, check_jwt, vehicle)
integrateRouters.get('/equipment', csrfProtect, check_jwt, equipment)
integrateRouters.get('/workpermit', csrfProtect, check_jwt, workpermit)
integrateRouters.get('/accesscontrol', csrfProtect, check_jwt, accesscontrol)

// integrateRouters.get('/dashboard', check_jwt, dashboard)


export { integrateRouters, integrateSchema }
