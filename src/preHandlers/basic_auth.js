
import basicAuth_ from 'express-basic-auth'
import { generateHashPassword, utilComparePassword } from '../utils/function.js'
import { createRequire } from "module";
import User from '../models/User/User.js';
import utilSetResponseJson from '../utils/util.SetResponseJson.js';
const require = createRequire(import.meta.url);

const getUnauthorizedResponse = (req) => {
    return req.auth ?
        utilSetResponseJson('failed', 'username or password incorrect')
        : utilSetResponseJson('failed', 'basic auth required')
}

const checkAuth = async (user, pass, cb) => {
    let check = await User.find({ username: user })
    if (check.length > 0) {
        if (await utilComparePassword(pass, check[0].password)) {
            return cb(null, true)
        }
    }
    return cb(null, false)
}

const basicAuth = () => {
    return basicAuth_({
        unauthorizedResponse: getUnauthorizedResponse,
        authorizer: checkAuth,
        authorizeAsync: true,
    })
}

export default basicAuth 