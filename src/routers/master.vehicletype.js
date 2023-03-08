
import express from 'express';
import { all, byid, add, edit, destroy } from '../handlers/vehicletype.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import validateSchema from '../preHandlers/schema_validate.js';
import vehicleTypeSchema from '../models/Master/VehicleType/schema.vehicleType.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let vehicleTypeRouters = express.Router();

vehicleTypeRouters.get('/all',
    csrfProtect,
    check_jwt,
    all)
vehicleTypeRouters.get('/byid/:_id',
    csrfProtect,
    check_jwt,
    byid)
vehicleTypeRouters.post('/add',
    parseForm,
    csrfProtect,
    check_jwt,
    add)
vehicleTypeRouters.put('/put/:_id',
    parseForm,
    csrfProtect,
    check_jwt,
    edit
)
vehicleTypeRouters.delete('/delete/:_id',
    csrfProtect,
    check_jwt,
    destroy
)
export { vehicleTypeRouters, vehicleTypeSchema }
