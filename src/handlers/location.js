
import Location from "../models/Master/Location/Location.js";
import _ from 'lodash'
import moment from 'moment-timezone';
import User from '../models/User/User.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';
import validator from 'validator'

const all = async (req, res) => {

    try {

        let search = (req) ? req.query.search : undefined
        search = (search) ? {
            $or: [
                { Location_Name: { $regex: '.*' + sanitize(search) + '.*' } }
            ]
        } : {}

        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let sort = req.query.sort || 'Location_ID'
        let order = req.query.order || 'asc'

        let data = await Location.find()
            .where(search)
            .skip(((page) - 1) * limit)
            .limit(limit)
            .sort((order == 'desc') ? '-' + sort : sort)
            .then((async (result) => {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index]._doc;
                    if (element.created_by) {
                        let created_by = await User.findOne().where({ _id: element.created_by })
                        if (created_by)
                            element.created_by = created_by._doc.username
                    }
                    if (element.updated_by) {
                        let updated_by = await User.findOne().where({ _id: element.updated_by })
                        if (updated_by)
                            element.updated_by = updated_by._doc.username
                    }
                }
                return result
            }))


        let len_data = await Location.count().where(search)


        data = {
            currentPage: page,
            pages: Math.ceil(len_data / limit),
            currentCount: data.length,
            totalCount: len_data,
            data: data

        }
        // data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        // data = JSON.parse(data)
        // return res.send(data)



        return res.send({ Status: "success", Message: validator.escape(data) })

    } catch (error) {
        // error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        // error = JSON.parse(error)
        // return res.send(error)

        return res.send({ Status: "failed", Message: validator.escape(error.toString()) })

    }
}
const byid = async (req, res) => {
    try {
        let data = await Location.find()
            .where({ _id: req.params._id })
            .then((async (result) => {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index]._doc;
                    if (element.created_by) {
                        let created_by = await User.findOne().where({ _id: element.created_by })
                        if (created_by)
                            element.created_by = created_by._doc.username
                    }
                    if (element.updated_by) {
                        let updated_by = await User.findOne().where({ _id: element.updated_by })
                        if (updated_by)
                            element.updated_by = updated_by._doc.username
                    }
                }
                return result[0]
            }))
        if (!data) {
            // data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: "data not found" }))
            // data = JSON.parse(data)
            // return res.send(data)

            return res.send({ Status: "failed", Message: validator.escape("data not found") })


        }
        // data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        // data = JSON.parse(data)
        // return res.send(data)

        return res.send({ Status: "success", Message: validator.escape(data) })

    } catch (error) {
        // error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        // error = JSON.parse(error)
        // return res.send(error)
        return res.send({ Status: "failed", Message: validator.escape(error.toString()) })

    }
}
const add = async (req, res) => {
    try {


        if (!req.body.Location_ID) {
            let Location_ID = await Location.findOne().sort({ Location_ID: -1 }).select('Location_ID')
            if (Location_ID) {
                req.body.Location_ID = Location_ID.Location_ID + 1
            } else {
                req.body.Location_ID = 1
            }
        }

        let data = await Location.create(
            {
                // ...req.body,
                Location_Name: sanitize(req.body.Location_Name),
                Location_ID: sanitize(req.body.Location_ID),
                Status: sanitize(req.body.Status) || 1,
                created_by: sanitize(req._id),
                created_date: new Date()
            })

        // data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        // data = JSON.parse(data)
        // return res.send(data)

        return res.send({ Status: "success", Message: validator.escape(data) })

    } catch (error) {
        // error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        // error = JSON.parse(error)
        // return res.send(error)
        return res.send({ Status: "failed", Message: validator.escape(error.toString()) })

    }
}

const edit = async (req, res) => {

    try {

        await Location.updateOne(
            { _id: req.params._id },
            {
                ...req.body,
                updated_by: req._id,
                updated_date: new Date()
            })

        let data = await Location.findOne()
            .where({ _id: req.params._id })
        if (!data) {
            // data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: "data not found" }))
            // data = JSON.parse(data)
            // return res.send(data)
            return res.send({ Status: "failed", Message: validator.escape("data not found") })

        }

        // data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        // data = JSON.parse(data)
        // return res.send(data)
        return res.send({ Status: "success", Message: validator.escape(data) })


    } catch (error) {
        // error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        // error = JSON.parse(error)
        // return res.send(error)
        return res.send({ Status: "failed", Message: validator.escape(error.toString()) })

    }

}

const destroy = async (req, res) => {
    try {
        let data = await Location.findOne()
            .where({ _id: req.params._id })
        if (!data) {
            // data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: "data not found" }))
            // data = JSON.parse(data)
            // return res.send(data)
            return res.send({ Status: "failed", Message: validator.escape("data not found") })

        }
        await Location.deleteOne(
            { _id: req.params._id })

        // data = sanitizeHtml(JSON.stringify({ Status: "success", Message: "success" }))
        // data = JSON.parse(data)
        // return res.send(data)
        return res.send({ Status: "success", Message: validator.escape("success") })


    } catch (error) {
        // error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        // error = JSON.parse(error)
        // return res.send(error)
        return res.send({ Status: "failed", Message: validator.escape(error.toString()) })

    }
}

export { all, byid, add, edit, destroy };
