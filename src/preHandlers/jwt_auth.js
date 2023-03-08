
import fs from 'fs'
import utilSetResponseJson from "../utils/util.SetResponseJson.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'
import User from '../models/User/User.js';
import Role from '../models/Role/Role.js';
import Application from '../models/Application/Application.js';
import Group from '../models/Group/Group.js';
import { decode } from 'punycode';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const check_jwt = (async (req, res, next) => {

    const authorization = req.headers['authorization']
    if (authorization === undefined)
        return anautorize(res)
    const token = req.headers['authorization'].split(' ')[1]
    if (token === undefined)
        return anautorize(res)

    const decodedToken = jwt.decode(token, {
        complete: true
    });

    // let test = jwt.verify(token, '2be97053-90b3-093c-d5ba-1f4d962c3808')
    // console.log(test)

    if (decodedToken && decodedToken.payload.exp > Math.floor(new Date().getTime()) / 1000) {
        let check = await User.findOne().where({ "id": decodedToken.payload.sub, login_status: true })
        if (!check)
            check = await User.findOne().where({ "_id": decodedToken.payload._id, login_status: true })

        if (!check)
            return anautorize(res)

        req.username = check.username
        req._id = check._id
        req.roles = decodedToken.roles
        next()
    } else {
        return anautorize(res)
    }

})

const anautorize = (res) => {
    if (res) {
        return res.status(401).send(utilSetResponseJson('failed', 'Unauthorized'))
    } else {
        return utilSetResponseJson('failed', 'Unauthorized')
    }
}

export { check_jwt } 