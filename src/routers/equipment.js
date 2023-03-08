
import express from 'express';
import { all, risk } from '../handlers/equipment.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import equipmentSchema from '../models/Equipment/schema.equipment.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let equipmentRouters = express.Router();
equipmentRouters.get('/all', csrfProtect, check_jwt, all)
equipmentRouters.get('/risk', csrfProtect, check_jwt, risk)

export { equipmentRouters, equipmentSchema }
