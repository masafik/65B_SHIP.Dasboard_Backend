
import express from 'express';
import { all } from '../handlers/people.js'
import { check_jwt } from '../preHandlers/jwt_auth.js'
import peopleSchema from '../models/People/schema.people.js'
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let peopleRouters = express.Router();

peopleRouters.get('/all', csrfProtect, check_jwt, all)

export { peopleRouters, peopleSchema }
