
import express from 'express';
import { all, vehicle2 } from '../handlers/vehicle.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import vehicleSchema from '../models/Vehicle/schema.vehicle.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let vehicleRouters = express.Router();

vehicleRouters.get('/all', csrfProtect, check_jwt, all)
vehicleRouters.get('/vehicle2', csrfProtect, check_jwt, vehicle2)

export { vehicleRouters, vehicleSchema }
