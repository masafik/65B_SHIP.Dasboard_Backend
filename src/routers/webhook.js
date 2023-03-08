
import express from 'express';
import {
    addBasicAuth, getBasicAuth, scaffolding, workPermit, accessControl,
    accessControlDevice, accessControlPut, accessControlExchangeCard, equipment, equipmentVehicle, vehicle, people, peopleRestrict, vehicle2, vehicle5, vehicle6
} from '../handlers/webhook.js'
import basicAuth from '../preHandlers/basic_auth.js';
import webHookSchema from '../models/Webhook/schema.webhook.js'
import validateSchema from '../preHandlers/schema_validate.js';
import webhookSchema from '../models/Webhook/schema.webhook.js'
import { check_jwt } from '../preHandlers/jwt_auth.js';
import csrf from 'csurf';
import bodyParser from 'body-parser'

var csrfProtect = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({
    extended: false
})

let webHookRouters = express.Router();


// webHookRouters.post('/addbasicauth/add',
//     validateSchema(webhookSchema['/api/webhook/addbasicauth/add'].post.parameters),
//     basicAuth(),
//     addBasicAuth)

// webHookRouters.get('/addbasicauth/all', basicAuth(), getBasicAuth)

webHookRouters.post('/scaffolding',
    parseForm,
    csrfProtect,
    check_jwt,
    scaffolding)
webHookRouters.post('/workpermit',
    validateSchema(webhookSchema['/api/webhook/workpermit'].post.parameters),
    check_jwt,
    workPermit)
webHookRouters.post('/accesscontrol',
    parseForm,
    csrfProtect,
    check_jwt,
    accessControl)
// webHookRouters.put('/accesscontrol/put',
//     validateSchema(webhookSchema['/api/webhook/accesscontrol/put'].put.parameters),
//     check_jwt,
//     accessControlPut)
webHookRouters.post('/accesscontroldevice',
    validateSchema(webhookSchema['/api/webhook/accesscontroldevice'].post.parameters),
    check_jwt,
    accessControlDevice)
webHookRouters.post('/accesscontrolexchangecard',
    validateSchema(webhookSchema['/api/webhook/accesscontrolexchangecard'].post.parameters),
    check_jwt,
    accessControlExchangeCard)

webHookRouters.post('/equipment',
    validateSchema(webhookSchema['/api/webhook/equipment'].post.parameters),
    check_jwt,
    equipment)

webHookRouters.post('/vehicle1',
    validateSchema(webhookSchema['/api/webhook/vehicle1'].post.parameters),
    check_jwt,
    vehicle)

webHookRouters.post('/vehicle2',
    validateSchema(webhookSchema['/api/webhook/vehicle2'].post.parameters),
    check_jwt,
    vehicle2)

webHookRouters.post('/vehicle3',
    validateSchema(webhookSchema['/api/webhook/vehicle3'].post.parameters),
    check_jwt,
    equipmentVehicle)

webHookRouters.post('/vehicle5',
    validateSchema(webhookSchema['/api/webhook/vehicle5'].post.parameters),
    check_jwt,
    vehicle5)

webHookRouters.post('/vehicle6',
    validateSchema(webhookSchema['/api/webhook/vehicle6'].post.parameters),
    check_jwt,
    vehicle6)

webHookRouters.post('/people',
    validateSchema(webhookSchema['/api/webhook/people'].post.parameters),
    check_jwt,
    people)

webHookRouters.post('/peoplerestrict',
    validateSchema(webhookSchema['/api/webhook/peoplerestrict'].post.parameters),
    check_jwt,
    peopleRestrict)


export { webHookRouters, webHookSchema }
