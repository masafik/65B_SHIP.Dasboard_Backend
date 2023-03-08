
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'; // CSRF Cookie parsing
import csrf from 'csurf';
import { queryParser } from 'express-query-parser'
import cors from 'cors'
import { Server } from 'socket.io';
import config from './src/utils/config.js'
import socket_io from "./src/utils/socket_io.js";
import swaggerUi from 'swagger-ui-express';
import methodOverride from 'method-override'
import mongoose_connect from './src/utils/db.js';
import { createRequire } from "module";
import { authRouters, authshema } from './src/routers/auth.js';
import { webHookRouters, webHookSchema } from './src/routers/webhook.js'
import { scaffoldingRouters, scaffoldingSchema } from './src/routers/scaffolding.js';
import { workPermitRouters, workPermitSchema } from './src/routers/workpermit.js';
import { vehicleTypeRouters, vehicleTypeSchema } from './src/routers/master.vehicletype.js';
import { scaffoldingTypeRouters, scaffoldingTypeSchema } from './src/routers/master.scaffoldingtype.js';
import { locationRouters, locationSchema } from './src/routers/master.location.js';
import { Validator, ValidationError } from "express-json-validator-middleware";

import { check_jwt } from './src/preHandlers/jwt_auth.js';
import basicAuth from 'express-basic-auth'
const require = createRequire(import.meta.url);
let swaggerDocument = require("./src/utils/swagger.json")

import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'
import { groupRouters, groupSchema } from './src/routers/group.js';
import { applicationRouters, applicationSchema } from './src/routers/application.js';
import { userRouters, userSchema } from './src/routers/user.js';
import { workpermitTypeRouters, workpermitTypeSchema } from './src/routers/master.workpermittype.js';
import { workpermitStatusRouters, workpermitStatusSchema } from './src/routers/master.workpermitstatus.js';
import { accessControlRouters, accessControlSchema } from './src/routers/accesscontrol.js';
import { equipmentRouters, equipmentSchema } from './src/routers/equipment.js';
import { oauthRouters } from './src/routers/oauth.js';
import { check_row_expire, get_workpermit_from_acc, get_acc_from_acc, get_acc_device_from_acc, get_workpermit_from_rabbitmq } from './src/utils/schedule_func.js';
import { peopleRouters, peopleSchema } from './src/routers/people.js';
import { vehicleRouters, vehicleSchema } from './src/routers/vehicle.js';
import sanitizeHtml from "sanitize-html";

import { integrateSchema, integrateRouters } from './src/routers/integrate.js';
import { check_notification_loop } from './src/utils/check_notification.js';
import { logsRouters, logsSchema } from './src/routers/logs.js';
import { masterRouters, schema } from './src/routers/master.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let helmet = require("helmet");

let server = express(); // Compliant
server.use(helmet.hidePoweredBy());
server.disable('x-powered-by');

server.use(methodOverride())

var whitelist = ['http://localhost:9000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

server.use(cors(corsOptions))


server.use(bodyParser.urlencoded({
    extended: false
}))
server.use(cookieParser())
server.use(bodyParser.json({ limit: '50mb' }))
server.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
)

//mongo connection
mongoose_connect()

//serer run
const app = server.listen(config.server_port, function (err, result) { })
const io = new Server(app, { cors: { origin: 'http://localhost:9000' }, path: '/api/socket/' });

//socket.io set up
io.use(async (socket, next) => {
    const header = socket.handshake.headers['authorization'];
    socket.headers = {}
    socket.headers['authorization'] = header
    await check_jwt(socket, '', next)
});
socket_io.socketConnection(io)

//routing
swaggerDocument.paths = {
    ...swaggerDocument.paths, ...authshema,

    ...webHookSchema,
    ...integrateSchema,
    ...workPermitSchema,
    ...scaffoldingSchema,
    ...accessControlSchema,
    ...equipmentSchema,
    ...peopleSchema,
    ...vehicleSchema,

    ...schema,
    ...workpermitTypeSchema,
    ...workpermitStatusSchema,
    ...vehicleTypeSchema,
    ...scaffoldingTypeSchema, ...locationSchema,
    ...userSchema,
    ...groupSchema, ...applicationSchema,
    ...logsSchema
}
server.use('/api-docs', basicAuth({
    users: { [config.swagger_user]: config.swagger_pass },
    challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api/auth', authRouters);
server.use('/api/oauth', oauthRouters)
server.use('/api/admin/user', userRouters)
server.use('/api/admin/group', groupRouters)
server.use('/api/admin/application', applicationRouters)
server.use('/api/admin/logs', logsRouters)
server.use('/api/webhook', webHookRouters);
server.use('/api/integrate', integrateRouters);
server.use('/api/scaffolding', scaffoldingRouters);
server.use('/api/workpermit', workPermitRouters);
server.use('/api/accesscontrol', accessControlRouters);
server.use('/api/equipment', equipmentRouters)
server.use('/api/people', peopleRouters)
server.use('/api/vehicle', vehicleRouters)
server.use('/api/master', masterRouters)
server.use('/api/master/workpermittype', workpermitTypeRouters)
server.use('/api/master/workpermitStatus', workpermitStatusRouters)
server.use('/api/master/vehicletype', vehicleTypeRouters)
server.use('/api/master/scaffoldingtype', scaffoldingTypeRouters)
server.use('/api/master/location', locationRouters)

server.get('/', (req, res) => {
    let data = sanitizeHtml(JSON.stringify({ Status: "success", Message: "65B_SHIP.DASHBOARD_BACKEND" }))
    data = JSON.parse(data)
    res.status(200).send(data)
})

var csrfProtect = csrf({ cookie: true })
server.get('/api/form', csrfProtect, function (req, res) {
    let data = sanitizeHtml(JSON.stringify({ Status: "success", Message: { csrfToken: req.csrfToken() } }))
    data = JSON.parse(data)
    res.status(200).send(data)
})

server.use((error, request, response, next) => {
    if (error instanceof ValidationError) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.validationErrors }))
        error = JSON.parse(error)

        response.status(400).send(error);
        next();
    } else {

        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)

        response.status(200).send(error)
    }
});

check_row_expire()
get_acc_from_acc()
get_acc_device_from_acc()
get_workpermit_from_acc()
get_workpermit_from_rabbitmq()
check_notification_loop()

export default server

