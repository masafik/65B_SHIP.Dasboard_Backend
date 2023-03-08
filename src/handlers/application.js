
import Application from "../models/Application/Application.js";
import Group from '../models/Group/Group.js';
import Role from '../models/Role/Role.js';
import { permission } from '../preHandlers/permission.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';


const all = async (req, res) => {

    try {

        await permission('62a5f0a4f06755a7772347e1', req)


        let search = (req) ? req.query.search : undefined
        search = (search) ? {
            $or: [
                { application_name: { $regex: '.*' + sanitize(search) + '.*' } },
                { url: { $regex: '.*' + sanitize(search) + '.*' } },
            ]
        } : {}

        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let sort = req.query.sort || 'order'
        let order = req.query.order || 'asc'

        let application_all = await Application.find().sort((order == 'desc') ? '-' + sort : sort)
        let group_all = await Group.find()
        let role_all = await Role.find().where({ application_id: { $in: application_all.map(el => { return el._id }) }, group_id: { $in: group_all.map(el => { return el._id }) } })

        let data = await Application.find()
            .where({ ...search, parent_id: '' })
            .skip(((page) - 1) * limit)
            .limit(limit)
            .sort((order == 'desc') ? '-' + sort : sort)
            .then((async (result) => {
                for (var element of result) {
                    if (!element) {
                        break;                                 // Compliant
                    } else {
                        element = element._doc;
                        element.role = []
                        element.child = []
                        element.role = role_all.filter((el) => {
                            if (el.application_id == element._id) {
                                el._doc.group_name = group_all.filter((el1) => {
                                    if (el1._id == el.group_id) {
                                        return el1
                                    }
                                })
                                el._doc.group_name = el._doc.group_name[0].group_name
                                return el
                            }
                        })

                        element.child = application_all.filter((el) => {
                            if (el.parent_id == element._id) {
                                el._doc.role = []
                                el._doc.child = []
                                el._doc.role = role_all.filter((el1) => {
                                    if (el1.application_id == el._id) {
                                        el1._doc.group_name = group_all.filter((el2) => {
                                            if (el2._id == el1.group_id) {
                                                return el2
                                            }
                                        })
                                        el1._doc.group_name = el1._doc.group_name[0].group_name
                                        return el1
                                    }
                                })
                                el._doc.child = application_all.filter((el1) => {
                                    if (el1.parent_id == el._id) {
                                        el1._doc.role = []
                                        el1._doc.child = []
                                        el1._doc.role = role_all.filter((el2) => {
                                            if (el2.application_id == el1._id) {
                                                el2._doc.group_name = group_all.filter((el3) => {
                                                    if (el3._id == el2.group_id) {
                                                        return el3
                                                    }
                                                })
                                                el2._doc.group_name = el2._doc.group_name[0].group_name
                                                return el2
                                            }
                                        })
                                        return el1
                                    }
                                })
                                return el
                            }
                        })
                    }

                }
                return result
            }))


        let len_data = await Application.count().where({ ...search, parent_id: '' })


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

        await permission('62a5f0a4f06755a7772347e1', req)


        let application_all = await Application.find().sort('order')
        let group_all = await Group.find()
        let role_all = await Role.find().where({ application_id: { $in: application_all.map(el => { return el._id }) }, group_id: { $in: group_all.map(el => { return el._id }) } })

        let data = await Application.find()
            .where({ _id: req.params._id })
            .then((async (result) => {
                for (var element of result) {
                    if (!element) {
                        break;                                 // Compliant
                    } else {
                        element = element._doc;
                        element.role = []
                        element.child = []
                        element.role = role_all.filter((el, index) => {
                            if (el.application_id == element._id) {
                                el._doc.group_name = group_all.filter((el1) => {
                                    if (el1._id == el.group_id) {
                                        return el1
                                    }
                                })
                                el._doc.group_name = el._doc.group_name[0].group_name
                                return el
                            }
                        })
                        element.child = application_all.filter((el) => {
                            if (el.parent_id == element._id) {
                                el._doc.role = []
                                el._doc.child = []
                                el._doc.role = role_all.filter((el1) => {
                                    if (el1.application_id == el._id) {
                                        el1._doc.group_name = group_all.filter((el2) => {
                                            if (el2._id == el1.group_id) {
                                                return el2
                                            }
                                        })
                                        el1._doc.group_name = el1._doc.group_name[0].group_name
                                        return el1
                                    }
                                })
                                el._doc.child = application_all.filter((el1) => {
                                    if (el1.parent_id == el._id) {
                                        el1._doc.role = []
                                        el1._doc.child = []
                                        el1._doc.role = role_all.filter((el2) => {
                                            if (el2.application_id == el1._id) {
                                                el2._doc.group_name = group_all.filter((el3) => {
                                                    if (el3._id == el2.group_id) {
                                                        return el3
                                                    }
                                                })
                                                el2._doc.group_name = el2._doc.group_name[0].group_name
                                                return el2
                                            }
                                        })
                                        return el1
                                    }
                                })
                                return el
                            }
                        })
                    }

                }
                return result
            }))
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: "data not found" }))
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

        await permission('62a5f0a4f06755a7772347e1', req)

        if (req.body.role && req.body.role.length > 0) {
            for (let element of req.body.role) {
                if (!element) {
                    break;                                 // Compliant
                } else {
                    let check = await Group.findOne().where({ _id: sanitize(element.group_id) })
                    if (!check) {
                        throw new Error("group not found")
                    }
                }

            }
        }
        if (!req.body.url) {
            req.body.url = req.body.application_name
        }
        if (!req.body.order) {
            let order = await Application.findOne().sort({ order: -1 }).select('order')
            if (order) {
                req.body.order = order.order + 1
            } else {
                req.body.order = 1
            }
        }


        let data = await Application.create(
            {
                application_name: sanitize(req.body.application_name),
                parent_id: sanitize(req.body.parent_id),
                is_menu: sanitize(req.body.is_menu),
                url: sanitize(req.body.url),
                config: sanitize(req.body.config),
                status: sanitize(req.body.status) || 1,
                order: sanitize(req.body.order),
                created_by: sanitize(req._id),
                created_date: new Date()
            })
        if (req.body.role && req.body.role.length > 0) {

            await Role.deleteMany({ application_id: sanitize(req.params._id) })

            for (let element of req.body.role) {
                if (!element) {
                    break;                                 // Compliant
                } else {
                    await Role.create({
                        // ...element,
                        application_id: sanitize(data._id),
                        group_id: sanitize(element.group_id),
                        get: sanitize(element.get),
                        put: sanitize(element.put),
                        post: sanitize(element.post),
                        delete: sanitize(element.delete)

                    })
                }

            }
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

const edit = async (req, res) => {

    try {

        await permission('62a5f0a4f06755a7772347e1', req)


        if (req.body.parent_id) {
            let check = await Application.findOne().where({ _id: sanitize(req.body.parent_id) })
            if (!check) {
                throw new Error("parent_id not found")

            }

        }

        if (req.body.role && req.body.role.length > 0) {
            for (let element of req.body.role) {
                if (!element) {
                    break;                                 // Compliant
                } else {
                    let check = await Group.findOne().where({ _id: sanitize(element.group_id) })
                    if (!check) {
                        throw new Error("group not found")
                    }
                }

            }
        }

        let body = sanitize(req.body)
        await Application.updateOne(
            { _id: sanitize(req.params._id) },
            {
                ...body,
                updated_by: sanitize(req._id),
                updated_date: new Date()
            })
        if (req.body.role && req.body.role.length > 0) {

            await Role.deleteMany({ application_id: sanitize(req.params._id) })

            for (let element of req.body.role) {
                if (!element) {
                    break;                                 // Compliant
                } else {
                    await Role.create({
                        // ...element,
                        application_id: sanitize(req.params._id),
                        group_id: sanitize(element.group_id),
                        get: sanitize(element.get),
                        put: sanitize(element.put),
                        post: sanitize(element.post),
                        delete: sanitize(element.delete)

                    })
                }

            }
        } else if (req.body.role && req.body.role.length == 0) {
            await Role.deleteMany({ application_id: sanitize(req.params._id) })
        }

        let data = await Application.find()
            .where({ _id: sanitize(req.params._id) })
            .then((async (result) => {
                for (var element of result.length) {
                    if (!element) {
                        break;                                 // Compliant
                    } else {
                        element = element._doc;
                        let role = await Role.find().where({ application_id: sanitize(element._id) })
                        element.role = role
                    }
                }
                return result[0]
            }))
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: "data not found" }))
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

const destroy = async (req, res) => {
    try {

        await permission('62a5f0a4f06755a7772347e1', req)


        let data = await Application.findOne()
            .where({ _id: sanitize(req.params._id) })
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: 'data not found' }))
            data = JSON.parse(data)
            return res.send(data)
        }
        await Application.deleteOne(
            { _id: sanitize(req.params._id) })

        await Role.deleteMany({ application_id: sanitize(req.params._id) })

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
