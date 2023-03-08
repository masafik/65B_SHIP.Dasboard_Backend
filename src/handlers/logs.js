
import _ from 'lodash'
import Logs from '../models/Logs/Logs.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {

        let search = (req) ? req.query.search : undefined
        search = (search) ? {
            $or: [
                { username: { $regex: '.*' + sanitize(search) + '.*' } },
                { url: { $regex: '.*' + sanitize(search) + '.*' } },
                { aciton: { $regex: '.*' + sanitize(search) + '.*' } },
                { error: { $regex: '.*' + sanitize(search) + '.*' } },

            ]
        } : {}

        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let sort = req.query.sort || 'username'
        let order = req.query.order || 'asc'

        let data = await Logs.find()
            .where(search)
            .skip(((page) - 1) * limit)
            .limit(limit)
            .sort((order == 'desc') ? '-' + sort : sort)
            .then((async (result) => {
                // for (let index = 0; index < result.length; index++) {
                //     const element = result[index];
                //     delete element._doc.password
                //     if (element._doc.group_id) {
                //         let group_id = await Group.findOne().where({ _id: element._doc.group_id })
                //         if (group_id)
                //             result[index]._doc.group_id = {
                //                 group_name: group_id._doc.group_name,
                //                 group_id: group_id._doc.group_id
                //             }
                //         let created_by = await User.findOne().where({ _id: element._doc.created_by })
                //         if (created_by)
                //             result[index]._doc.created_by = created_by._doc.username
                //     }
                // }
                return result
            }))


        let len_data = await Logs.count().where(search)


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


export { all };
