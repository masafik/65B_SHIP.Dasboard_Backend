
import WorkpermitStatus from "../models/Master/WorkpermitStatus/WorkpermitStatus.js";
import _ from 'lodash'
import User from '../models/User/User.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {

        let search = (req) ? req.query.search : undefined
        search = (search) ? {
            $or: [
                { Status_ID: { $regex: '.*' + sanitize(search) + '.*' } },
                { Status_Name: { $regex: '.*' + sanitize(search) + '.*' } },
                { Status_Desc: { $regex: '.*' + sanitize(search) + '.*' } }
            ]
        } : {}

        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let sort = req.query.sort || 'Status_ID'
        let order = req.query.order || 'asc'

        let data = await WorkpermitStatus.find()
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


        let len_data = await WorkpermitStatus.count().where(search)


        data = {
            currentPage: page,
            pages: Math.ceil(len_data / limit),
            currentCount: data.length,
            totalCount: len_data,
            data: data

        }
        data = sanitizeHtml(JSON.stringify(data))
        data = JSON.parse(data)

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
        let data = await WorkpermitStatus.find()
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

        // if (!req.body.Seq) {
        //     let Seq = await WorkpermitStatus.findOne().sort({ Seq: -1 }).select('Seq')
        //     if (Seq) {
        //         req.body.Seq = Seq.Seq + 1
        //     } else {
        //         req.body.Seq = 1
        //     }
        // }
        // let IsMain = (req.body.IsMain != undefined) ? req.body.IsMain : 1
        let data = await WorkpermitStatus.create(
            {
                ...req.body,
                created_by: req._id,
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

        await WorkpermitStatus.updateOne(
            { _id: req.params._id },
            {
                ...req.body,
                updated_by: req._id,
                updated_date: new Date()
            })

        let data = await WorkpermitStatus.findOne()
            .where({ _id: req.params._id })
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

const destroy = async (req, res) => {
    try {
        let data = await WorkpermitStatus.findOne()
            .where({ _id: req.params._id })
        if (!data) {
            data = sanitizeHtml(JSON.stringify({ Status: "failed", Message: 'data not found' }))
            data = JSON.parse(data)
            return res.send(data)
        }
        await WorkpermitStatus.deleteOne(
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
