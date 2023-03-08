import Role from "../models/Role/Role.js"
import User from "../models/User/User.js"
import Group from "../models/Group/Group.js"
import config from "../utils/config.js"

const permission = (async (application_id, req) => {
    let check_user = await User.findOne().where({ _id: req._id })
    // console.log(check_user)

    // let group_name = check_user._doc.others.registrations.filter(el => { return el.applicationId == config.auth_app_id })
    // group_name = group_name[0].roles[0]
    // let group = await Group.findOne().where({ _id: check_user.group_id })

    let check_permission = await Role.find().where({ application_id: application_id, group_id: check_user.group_id })
    if (check_permission.length == 0) {
        throw new Error('Forbidden')
    }

})


export { permission };

