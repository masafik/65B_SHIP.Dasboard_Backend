
import Group from "../models/Group/Group.js";
import _ from 'lodash'
import User from '../models/User/User.js';
import { generateHashPassword } from '../utils/function.js';
import { permission } from '../preHandlers/permission.js';
import config from '../utils/config.js';
import axios from 'axios';
import { compare_user } from '../utils/schedule_func.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const URL = require("url").URL
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {

        await permission('62a594d7bb8946576769c6a7', req)

        compare_user()

        let search = (req) ? req.query.search : undefined
        search = (search) ? {
            $or: [
                { username: { $regex: '.*' + sanitize(search) + '.*' } },
                { id: { $regex: '.*' + sanitize(search) + '.*' } },
                { email: { $regex: '.*' + sanitize(search) + '.*' } },
                { 'others.fname': { $regex: '.*' + sanitize(search) + '.*' } },
                { 'others.lname': { $regex: '.*' + sanitize(search) + '.*' } }
            ]
        } : {}

        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let sort = req.query.sort || 'username'
        let order = req.query.order || 'asc'


        let data = await User.find()
            .where(search)
            .skip(((page) - 1) * limit)
            .limit(limit)
            .sort((order == 'desc') ? '-' + sort : sort)
            .then((async (result) => {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    delete element._doc.password
                    if (element._doc.group_id) {
                        let group_id = await Group.findOne().where({ _id: element._doc.group_id })
                        if (group_id)
                            result[index]._doc.group_id = {
                                group_name: group_id._doc.group_name,
                                group_id: group_id._doc.group_id,
                                _id: group_id._doc._id

                            }
                        let created_by = await User.findOne().where({ _id: element._doc.created_by })
                        if (created_by)
                            result[index]._doc.created_by = created_by._doc.username
                    }
                }
                return result
            }))


        let len_data = await User.count().where(search)


        data = {
            currentPage: page,
            pages: Math.ceil(len_data / limit),
            currentCount: data.length,
            totalCount: len_data,
            data: data

        }

        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        return res.send(data)
    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}
const byid = async (req, res) => {
    try {

        await permission('62a594d7bb8946576769c6a7', req)

        let data = await User.find()
            .where({ _id: req.params._id })
            .then((async (result) => {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    delete element._doc.password
                    if (element._doc.group_id) {
                        let group_id = await Group.findOne().where({ _id: element._doc.group_id })
                        if (group_id)
                            result[index]._doc.group_id = {
                                group_name: group_id._doc.group_name,
                                group_id: group_id._doc.group_id,
                                _id: group_id._doc._id

                            }
                        let created_by = await User.findOne().where({ _id: element._doc.created_by })
                        if (created_by)
                            result[index]._doc.created_by = created_by._doc.username
                    }
                }
                return result[0]
            }))
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: 'data not found' }))
            data = JSON.parse(data)
            return res.send(data)
        }
        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        return res.send(data)
    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}
const add = async (req, res) => {
    try {


        await permission('62a594d7bb8946576769c6a7', req)

        if (req.body.group_id) {
            let check = await Group.findOne().where({ _id: req.body.group_id })
            if (!check) {
                throw new Error('group_id not found')
            }
        }

        // add user in authen systen
        let api = new URL(config.auth_host + '/user/registration')
        let add_user = await axios.post(api.href,
            {
                "registration": {
                    "applicationId": config.auth_app_id
                },
                "user": {
                    "username": req.body.username,
                    "password": req.body.password,
                    "data": req.body.others

                }
            },
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        ).then(res => {
            return res.data
        }).catch(err => {
            throw new Error(err.response.data)
        })

        if (req.body.group_id) {

            let group = check

            let api = new URL(config.auth_host + '/application/' + config.auth_app_id)
            let application = await axios.get(api.href,
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            )
            let group_other_id = application.data.application.roles.filter(el => { return el.id == group.others.id })

            api = new URL(config.auth_host + '/user/registration/' + add_user.user.id + '/' + config.auth_app_id)
            await axios.put(api.href,
                {
                    "registration": {
                        "applicationId": config.auth_app_id,
                        "roles": [
                            group_other_id[0].name
                        ]
                    }
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            ).then(res => {
                return res.data
            }).catch(err => {
                throw new Error(err.response.data)
            })

        } else {
            let group = await Group.findOne().where({ "others.name": add_user.registration.roles[0] })
            req.body.group_id = group._id
        }
        let data = await User.create(
            {
                // ...req.body,
                username: sanitize(req.body.username),
                group_id: sanitize(req.body.group_id),
                others: sanitize(req.body.others),
                password: await generateHashPassword(req.body.password),
                id: sanitize(add_user.user.id),
                status: sanitize(req.body.status) || 1,
                created_by: sanitize(req._id),
                created_date: new Date()
            })
        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        return res.send(data)
    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}

const edit = async (req, res) => {

    try {


        await permission('62a594d7bb8946576769c6a7', req)
        let data = await User.findOne().where({ _id: sanitize(req.params._id) })
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: 'data not found' }))
            data = JSON.parse(data)
            return res.send(data)
        }
        if (req.body.group_id) {
            let check = await Group.findOne().where({ _id: sanitize(req.body.group_id) })
            if (!check) {
                throw new Error('group_id not found')
            }
        }

        let put_user = {}

        if (req.body.others) {
            let api = new URL(config.auth_host + '/user/' + data.id)
            let put_user_ = await axios.patch(api.href,
                {
                    "applicationId": config.auth_app_id,
                    "user": {
                        "data": req.body.others
                    }
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            ).then(res => {
                return res.data
            }).catch(err => {
                throw new Error(err.response.data)
            })

            put_user.others = put_user_.user.data
        }

        if (req.body.group_id) {
            let group = check

            let api = new URL(config.auth_host + '/application/' + config.auth_app_id)
            let application = await axios.get(api.href,
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            )
            let group_other_id = application.data.application.roles.filter(el => { return el.id == group.others.id })

            api = new URL(config.auth_host + '/user/registration/' + data.id + '/' + config.auth_app_id)
            await axios.put(api.href,
                {
                    "registration": {
                        "applicationId": config.auth_app_id,
                        "roles": [
                            group_other_id[0].name
                        ]
                    }
                },
                {
                    headers: {
                        'Authorization': config.auth_api_key
                    }
                }
            ).then(res => {
                return res.data
            }).catch(err => {
                throw new Error(err.response.data)
            })

        }

        await User.updateOne(
            { _id: req.params._id },
            {
                ...req.body,
                ...put_user,
                updated_by: req._id,
                updated_date: new Date()
            })

        data = await User.findOne().where({ _id: req.params._id })
        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        return res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }

}

const destroy = async (req, res) => {
    try {

        await permission('62a594d7bb8946576769c6a7', req)

        let data = await User.findOne().where({ _id: req.params._id })
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: 'data not found' }))
            data = JSON.parse(data)
            return res.send(data)
        }
        let api = new URL(config.auth_host + '/user/' + data.id)
        await axios.delete(api.href,
            {
                headers: {
                    'Authorization': config.auth_api_key
                }
            }
        ).then(res => {
            return res.data
        }).catch(err => {
            throw new Error(err.response.data)
        })

        await User.deleteOne(
            { _id: req.params._id })

        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: "success" }))
        data = JSON.parse(data)
        return res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)

    }
}

export { all, byid, add, edit, destroy };
