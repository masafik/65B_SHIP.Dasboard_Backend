

import moment from 'moment-timezone';
import User from "../models/User/User.js";
import fs from 'fs'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from "../utils/config.js";
import Group from '../models/Group/Group.js';
import Application from '../models/Application/Application.js';
import Role from '../models/Role/Role.js';
import { createRequire } from "module";
import { permission } from '../preHandlers/permission.js';
import { check_notification } from '../utils/check_notification.js'
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const uuid = require("uuid");

const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
const URL = require("url").URL

const login = async (req, res) => {
    try {

        let data = req.body
        let success = true

        let api = new URL(config.auth_host + '/login')
        let login = await axios.post(api.href,
            {
                loginId: data.username,
                password: data.password,
                applicationId: config.auth_app_id
            },
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        ).then(res => {
            return res.data
        }).catch(async err => {
            if (err.response) {
                if (err.response.data.statusCode == 404) {
                    res.statusCode = 400
                    throw new Error("Unauthorized")
                }
            }

            // swith to own login
            success = false
        })


        if (success == false) {
            data = await own_login(req.body)

            data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
            data = JSON.parse(data)
            return res.send(data)

        }



        let role = login.user.registrations.filter(el => { return el.applicationId == config.auth_app_id })

        if (role.length == 0) {

            //register
            api = new URL(config.auth_host + '/user/registration/' + login.user.id)
            await axios.post(api.href,
                {
                    registration: {
                        applicationId: config.auth_app_id
                    }
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            )


            login = await add_role(data, login)

        } else if (!role[0].roles) {

            login = await add_role(data, login)

        }

        role = login.user.registrations.filter(el => { return el.applicationId == config.auth_app_id })
        api = new URL(config.auth_host + '/application/' + config.auth_app_id)
        let application = await axios.get(api.href,
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        )

        let group_other_id = application.data.application.roles.filter(el => { return el.name == role[0].roles[0] })


        let group_id = await Group.findOne().where({ "others.id": group_other_id[0].id })

        if (!group_id) {
            res.statusCode = 403
            throw new Error("Forbidden")

        }


        let others = {
            fname: (login.user.firstName) ? login.user.firstName : (login.user.data.fname) ? login.user.data.fname : '',
            lname: (login.user.lastName) ? login.user.lastName : (login.user.data.lname) ? login.user.data.lname : '',

            code: login.user.data.employeeid,
            employeeid: login.user.data.employeeid
        }

        login.user.data = { ...login.user.data, ...others }

        let check = await User.findOne().where({ id: login.user.id })
        if (!check) {
            await User.create({
                username: sanitize(data.username),
                status: 1,
                group_id: sanitize(group_id._id),
                id: sanitize(login.user.id),
                others: sanitize(others),
                email: (login.user.email) ? sanitize(login.user.email) : null,
                login_status: true,
                created_date: new Date()
            })

        } else {
            await User.updateOne({ _id: check._id }, {
                others: others,
                email: (login.user.email) ? sanitize(login.user.email) : null,
                group_id: sanitize(group_id._id),
                login_status: true,
            })

        }



        data = {
            username: data.username,
            access_token: login.token,
            expires_at: Math.floor(login.tokenExpirationInstant / 1000),
            expires_in: Math.floor((login.tokenExpirationInstant - new Date().getTime()) / 1000),
            token_type: "Bearer",
            tokenExpirationInstant: login.tokenExpirationInstant,
            user: login.user
        }

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (group_id.others.id == config.ptt_group_id && !login.user.data.employeeid) {
            data_.MessageAlert = 'ไม่พบรหัสพนักงานผู้ควบคุมงานของคุณในระบบ กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        data_ = sanitizeHtml(JSON.stringify(data_))
        res.send(JSON.parse(data_))

    } catch (error) {

        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        res.send(error)
    }
}

const loginAd = async (req, res) => {
    const privateKey = fs.readFileSync(__dirname + '/../utils/private.key')

    try {

        let data = req.body
        let test = []

        let success = true
        let api = new URL(config.auth_host + '/login/ad')
        let login = await axios.post(api.href,
            {
                loginId: data.username,
                applicationId: config.auth_app_id
            },
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        ).then(res => {
            return res.data
        }).catch(err => {
            if (err.response) {
                if (err.response.data.statusCode == 404) {
                    res.statusCode = 400
                    throw new Error("Unauthorized")

                }
            }

            // switch to own login
            success = false
        })

        if (success == false) {
            let data = await own_login(req.body)

            data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
            data = JSON.parse(data)
            return res.send(data)

        }

        let role = login.user.registrations.filter(el => { return el.applicationId == config.auth_app_id })

        /**
        * ผู้ควบคุมงาน ปตท.
        */
        let group = config.ptt_group_id

        if (role.length == 0) {

            //register
            let api = new URL(config.auth_host + '/user/registration/' + login.user.id)
            await axios.post(api.href,
                {
                    registration: {
                        applicationId: config.auth_app_id
                    }
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            )

            login = await add_role(data, login, group)

        } else if (!role[0].roles) {

            login = await add_role(data, login, group)

        }

        role = login.user.registrations.filter(el => { return el.applicationId == config.auth_app_id })

        api = new URL(config.auth_host + '/application/' + config.auth_app_id)
        let application = await axios.get(api.href,
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        )

        let group_other_id = application.data.application.roles.filter(el => { return el.name == role[0].roles[0] })


        let group_id = await Group.findOne().where({ "others.id": group_other_id[0].id })

        if (!group_id) {
            res.statusCode = 403
            throw new Error("Forbidden")

        }

        let others = {
            fname: (login.user.firstName) ? login.user.firstName : (login.user.data.fname) ? login.user.data.fname : '',
            lname: (login.user.lastName) ? login.user.lastName : (login.user.data.lname) ? login.user.data.lname : '',

            code: login.user.data.employeeid,
            employeeid: login.user.data.employeeid
        }
        login.user.data = { ...login.user.data, ...others }
        let check = await User.findOne().where({ id: login.user.id })
        if (!check) {
            let check = await User.create({
                username: sanitize(data.username),
                status: 1,
                group_id: sanitize(group_id._id),
                id: sanitize(login.user.id),
                others: sanitize(others),
                login_status: true,
                created_date: new Date()
            })

        } else {
            await User.updateOne({ _id: check._id }, {
                username: sanitize(data.username),
                others: sanitize(others),
                group_id: sanitize(group_id._id),
                login_status: true,
            })

        }

        data = {
            username: data.username,
            access_token: login.token,
            expires_at: Math.floor(login.tokenExpirationInstant / 1000),
            expires_in: Math.floor((login.tokenExpirationInstant - new Date().getTime()) / 1000),
            token_type: "Bearer",
            tokenExpirationInstant: login.tokenExpirationInstant,
            user: login.user
        }

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (group_id.others.id == config.ptt_group_id && !login.user.data.employeeid) {
            data_.MessageAlert = 'ไม่พบรหัสพนักงานผู้ควบคุมงานของคุณในระบบ กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        data_ = sanitizeHtml(JSON.stringify(data_))
        res.send(JSON.parse(data_))

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        res.send(error)
    }
}

const add_role = async (data, login, group) => {
    try {
        //check default role
        let api = new URL(config.auth_host + '/application/' + config.auth_app_id)
        let application = await axios.get(api.href,
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        )

        let roles = application.data.application.roles

        if (group != null) {
            let role = roles.filter(el => { return el.id == group })

        } else {
            let role = roles.filter(el => { return el.isDefault == true })
        }


        api = new URL(config.auth_host + '/user/registration/' + login.user.id + '/' + config.auth_app_id)
        let add_role = await axios.put(api.href,
            {
                registration: {
                    applicationId: config.auth_app_id,
                    roles: [
                        role[0].name
                    ]
                }
            },
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        )

        if (data.password) {
            let api = new URL(config.auth_host + '/login')
            let login = await axios.post(api.href,
                {
                    loginId: data.username,
                    password: data.password,
                    applicationId: config.auth_app_id
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            ).then(res => {
                return res.data
            })
        } else {
            let api = new URL(config.auth_host + '/login/ad')
            let login = await axios.post(api.href,
                {
                    loginId: data.username,
                    applicationId: config.auth_app_id
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            ).then(res => {
                return res.data
            })
        }


        return login
    } catch (error) {

        throw error
    }

}

const token = async (req, res) => {
    const privateKey = fs.readFileSync(__dirname + '/../utils/private.key')

    try {

        let grant_type = req.query.grant_type
        let client_id = req.query.client_id
        let client_secret = req.query.client_secret
        let refresh_token = req.query.refresh_token


        req.body.username = client_id
        req.body.password = client_secret
        return await login(req, res)


        // if (grant_type == 'client_credentials') {

        //     if (!client_id) {
        //         return res.send(utilSetResponseJson('failed',
        //             {
        //                 "query": [
        //                     {
        //                         "instancePath": "",
        //                         "schemaPath": "#/required",
        //                         "keyword": "required",
        //                         "params": {
        //                             "missingProperty": "client_id"
        //                         },
        //                         "message": "must have required property 'client_id'"
        //                     }
        //                 ]
        //             }))
        //     }
        //     if (!client_secret) {
        //         return res.send(utilSetResponseJson('failed',
        //             {
        //                 "query": [
        //                     {
        //                         "instancePath": "",
        //                         "schemaPath": "#/required",
        //                         "keyword": "required",
        //                         "params": {
        //                             "missingProperty": "client_secret"
        //                         },
        //                         "message": "must have required property 'client_secret'"
        //                     }
        //                 ]
        //             }))
        //     }



        //     let check = await User.findOne().where({ 'others.client_id': client_id, 'others.client_secret': client_secret })
        //     if (!check) {
        //         res.send(utilSetResponseJson('failed', 'Unauthorized'))
        //     }

        //     let xCurrentTime = Math.floor(Date.now() / 1000)
        //     const issuedAt = xCurrentTime
        //     const expirationTime = xCurrentTime + (config.config_access_oauth_token_expiration_time);

        //     const payload = {
        //         _id: check._id,
        //         username: check.username,
        //         iat: issuedAt,
        //         exp: expirationTime,
        //     }
        //     const token = jwt.sign(payload, privateKey);

        //     delete check._doc.password

        //     let refresh_token = uuid.v4()
        //     let exp = Date.now() + (config.config_refresh_oauth_token_expiration_time_oauth * 1000)
        //     let before_update = await User.findOne({
        //         _id: check._id
        //     })


        //     await User.findOneAndUpdate({ _id: check._id }, {
        //         login_status: true,
        //         others: {
        //             ...before_update.others,
        //             ...{
        //                 token_set: {
        //                     refresh_token: refresh_token,
        //                     exp: exp
        //                 }
        //             }
        //         }
        //     })

        //     let data = {
        //         username: check.username,
        //         access_token: token,
        //         expires_at: expirationTime,
        //         expires_in: config.config_access_token_expiration_time,
        //         refresh_token: refresh_token,
        //         token_type: 'Bearer'
        //     }

        //     data = sanitizeHtml(JSON.stringify(data))
        //     return res.send(utilSetResponseJson('success', JSON.parse(data)))

        // }

        // else if (grant_type == 'refresh_token') {

        //     let check = await User.findOne({
        //         'others.token_set.refresh_token': refresh_token
        //     })

        //     if (!check) {
        //         return res.send(utilSetResponseJson('failed', 'refresh_token not found'))
        //     }

        //     if (check.others.token_set.exp < new Date()) {
        //         return res.send(utilSetResponseJson('failed', 'refresh_token expired'))
        //     }

        //     let xCurrentTime = Math.floor(Date.now() / 1000)
        //     const issuedAt = xCurrentTime
        //     const expirationTime = xCurrentTime + (config.config_access_oauth_token_expiration_time);

        //     const payload = {
        //         _id: check._id,
        //         username: check.username,
        //         iat: issuedAt,
        //         exp: expirationTime,
        //     }
        //     const token = jwt.sign(payload, privateKey);

        //     delete check._doc.password

        //     let data = {
        //         username: check.username,
        //         access_token: token,
        //         expires_at: expirationTime,
        //         expires_in: config.config_access_token_expiration_time,
        //         token_type: 'Bearer'
        //     }

        //     data = sanitizeHtml(JSON.stringify(data))
        //     return res.send(utilSetResponseJson('success', JSON.parse(data)))
        // } else {
        //     return res.send(utilSetResponseJson('failed', "grant_type not allow"))

        // }

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        res.send(error)
    }
}
const logout = async (req, res) => {

    try {

        await User.findOneAndUpdate({ username: req.username }, {
            login_status: false
        })

        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: "success" }))
        data = JSON.parse(data)
        res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        res.send(error)
    }
}

const mydata = async (req, res) => {
    try {

        let application_id = '62a5eacea5f80f8ea3c9ddc5'
        await permission(application_id, req)

        // return res.send(req._id)
        let data = await User.findOne({ username: req.username })
        let check_notification_all = await check_notification(data._doc)
        let group_id = await Group.findOne().where({ _id: data._doc.group_id })
        if (group_id)
            data._doc.group_id = {
                group_name: group_id._doc.group_name,
                group_id: group_id._doc.group_id,
                _id: group_id._doc._id
            }
        let application_all = await Application.find()
        let role_all = await Role.find().where({ application_id: { $in: application_all.map(el => { return el._id }) }, group_id: group_id._doc._id })


        data._doc.role = await Application.find()
            .sort('order')
            .where({ parent_id: '' })
            .then((async (result) => {
                let result_ = []
                for (let index = 0; index < result.length; index++) {
                    const element = result[index]._doc;

                    let notification = false
                    notification = check_notification_all[element.url]

                    let check = role_all.filter((el) => { return el.application_id == element._id })
                    if (check.length > 0) {
                        element.get = check[0]._doc.get
                        element.put = check[0]._doc.put
                        element.post = check[0]._doc.post
                        element.delete = check[0]._doc.delete
                        element.notification = notification
                        element.child = application_all.filter((el) => {
                            el = el._doc
                            if (el.parent_id == element._id) {

                                let check = role_all.filter((el1) => { return el1.application_id == el._id })
                                if (check.length > 0) {
                                    el.get = check[0]._doc.get
                                    el.put = check[0]._doc.put
                                    el.post = check[0]._doc.post
                                    el.delete = check[0]._doc.delete
                                    el.child = application_all.filter((el1) => {
                                        el1 = el1._doc
                                        if (el1.parent_id == el._id) {
                                            let check = role_all.filter((el2) => { return el2.application_id == el1._id })
                                            if (check.length > 0) {
                                                el1.get = check[0]._doc.get
                                                el1.put = check[0]._doc.put
                                                el1.post = check[0]._doc.post
                                                el1.delete = check[0]._doc.delete
                                                return el1

                                            }
                                        }
                                    })
                                    return el
                                }
                            }
                        })

                        result_.push(element)
                    }

                }
                return result_
            }))

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (group_id.others.id == config.ptt_group_id && !data.others.employeeid) {
            data_.MessageAlert = 'ไม่พบรหัสพนักงานผู้ควบคุมงานของคุณในระบบ กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        data_ = sanitizeHtml(JSON.stringify(data_))
        res.send(JSON.parse(data_))

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        res.send(error)
    }
}

const own_login = async (body) => {
    const privateKey = fs.readFileSync(__dirname + '/../utils/private.key')

    try {

        let check = await User.findOne().where({ $or: [{ username: sanitize(body.username) }, { email: sanitize(body.username) }] })
        if (!check) {
            throw new Error("Unauthorized")

        }



        let xCurrentTime = Math.floor(Date.now() / 1000)
        const issuedAt = xCurrentTime
        const expirationTime = xCurrentTime + (config.config_access_oauth_token_expiration_time);

        const payload = {
            _id: check._id,
            username: check.username,
            iat: issuedAt,
            exp: expirationTime,
        }
        const token = jwt.sign(payload, privateKey);

        delete check._doc.password

        // let refresh_token = uuid.v4()
        // let exp = Date.now() + (config.config_refresh_oauth_token_expiration_time_oauth * 1000)
        // let before_update = await User.findOne({
        //     _id: check._id
        // })

        await User.findOneAndUpdate({ _id: check._id }, {
            login_status: true
        })

        check._doc.data = check.others

        let data = {
            username: body.username,
            access_token: token,
            expires_at: expirationTime,
            expires_in: config.config_access_token_expiration_time,
            token_type: "Bearer",
            // tokenExpirationInstant: login.tokenExpirationInstant,
            user: check
        }


        return data
    } catch (error) {
        throw error.toString()
    }

}


const exampleLogin = async (req, res) => {

    // try {


    //     let username = req.body.username
    //     let password = req.body.password
    //     // let check = user_sam
    //     let check = user_sam.filter(function (el) {
    //         return el.Username == username &&
    //             el.Password == password
    //     });


    //     if (check.length == 0) {
    //         check = await User.find({ username: username })
    //         if (await utilComparePassword(password, check[0].password)) {
    //         } else {
    //             return res.send(utilSetResponseJson('failed', 'Unauthorized'))
    //         }
    //     }


    //     if (check.length == 0) {
    //         return res.send(utilSetResponseJson('failed', 'Unauthorized'))
    //     }
    //     res.send(utilSetResponseJson('success', check[0]))
    // } catch (error) {
    //     res.send(utilSetResponseJson('failed', error.toString()))
    // }
}

export { login, loginAd, token, logout, mydata, exampleLogin };
