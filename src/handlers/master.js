
import Scaffolding from "../models/Scaffolding/Scaffolding.js";
import Location from "../models/Master/Location/Location.js";
import modelScaffoldingType from "../models/Master/ScaffoldingType/ScaffoldingType.js";
import _ from 'lodash'
import User from '../models/User/User.js';
import { permission } from '../preHandlers/permission.js';
import Role from '../models/Role/Role.js';
import socket_io from "../utils/socket_io.js";
import WorkPermit from '../models/WorkPermit/WorkPermit.js';
import Vehicle from '../models/Vehicle/Vehicle.js';
import AccessControl from '../models/AccessControl/AccessControl.js';
import People from '../models/People/People.js';
import Equipment from '../models/Equipment/Equipment.js';
import AccessControlDevice from '../models/AccessControlDevice/AccessControlDevice.js';

const pttstaffcodeAll = async (req, res) => {

    try {


        // let application_id = '62a4d4c622bdf92ba30d1633'
        // await permission(application_id, req)


        let pttstaffcodeAll = []

        let AgencyName = {}
        if (req.query.AgencyName && !req.query.AgencyName.toString().includes('ทั้งหมด')) {
            AgencyName = { AgencyName: { $in: sanitize(req.query.AgencyName) } }
        }

        let AgencyName_workpermit = {}
        if (req.query.AgencyName && !req.query.AgencyName.toString().includes('ทั้งหมด')) {
            AgencyName_workpermit = { supervisorDep: { $in: sanitize(req.query.AgencyName) } }
        }

        let which = {}
        if (req.query.which && !req.query.which.toString().includes('ทั้งหมด')) {
            which = req.query.which
        }

        // which = (which) ? { which: { $in: AgencyName } } : 

        let check_user = await User.findOne().where({ _id: req._id })

        let now = new Date
        let day_7 = new Date().setDate(new Date().getDate() + 7);

        //เจ้าของพื้นที่
        if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {

            // if (Object.keys(req.query).length === 0) {
            //     let location1 = await Scaffolding.find({ Owner: check_user.others.employeeid })
            //     where_permission = { AreaName: { $in: location1.map(el => { return el.AreaName }) } }

            // }
        }
        //ผู้ควบคุมงาน ปตท.
        else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission_workpermit = { PTTStaffCode: check_user.others.employeeid }
                where_permission_scaffolding = { PTTStaffCode: check_user.others.employeeid }
                where_permission_accesscontrol = { PTTStaffCode: check_user.others.employeeid }
                where_permission_people = { PTTStaffCode: check_user.others.employeeid }
                where_permission_vehicle = { PTTStaffCode: check_user.others.employeeid }
                where_permission_equipment = { PTTStaffCode: check_user.others.employeeid }
            }
        }
        //เจ้าหน้าที่รักษาความปลอดภัย
        else if (check_user.group_id == "62a4cb26e0a99b4456aaf522") {

        }
        //หน่วยงาน ปภ.ผยก.
        else if (check_user.group_id == "62a4cb5896deebf8a1f8abbe") {

        }

        //ผู้ดูแลระบบ
        else if (check_user.group_id == "62a4cb7696deebf8a1f8abc9") {

        }

        if (!which || which == 'workpermit') {
            await WorkPermit.find({
                $and: [AgencyName_workpermit]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.supervisorCode) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.supervisorCode, PTTStaff: element.supervisorFName + ' ' + element.supervisorLName })
                    }

                }
            })
        }

        if (!which || which == 'scaffolding') {
            await Scaffolding.find({
                $and: [AgencyName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaff })
                    }
                }
            })

        }

        if (!which || which == 'vehicle') {
            await Vehicle.find({
                $and: [AgencyName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffName })
                    }
                }
            })
        }

        if (!which || which == 'people') {
            await People.find({
                $and: [AgencyName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.PTTStaffID) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.PTTStaffID, PTTStaff: element.PTTStaffName })
                    }
                }
            })
        }

        if (!which || which == 'equipment') {
            await Equipment.find({
                $and: [AgencyName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffName })
                    }
                }
            })
        }


        if (!which || which == 'accesscontrol') {
            await AccessControl.find({
                $and: [AgencyName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (pttstaffcodeAll.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        pttstaffcodeAll.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffFirstName + ' ' + element.PTTStaffLastName })
                    }
                }
            })
        }

        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: pttstaffcodeAll }))
        data = JSON.parse(data)
        return res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}
const subareaAll = async (req, res) => {

    try {


        // let application_id = '62a4d4c622bdf92ba30d1633'
        // await permission(application_id, req)


        let subareaAll = []

        let AreaName = {}
        if (req.query.AreaName && !req.query.AreaName.toString().includes('ทั้งหมด')) {
            AreaName = { AreaName: { $in: sanitize(req.query.AreaName) } }
        }

        let which = {}
        if (req.query.which && !req.query.which.toString().includes('ทั้งหมด')) {
            which = req.query.which
        }
        // which = (which) ? { which: { $in: AreaName } } : 



        if (!which || which == 'vehicle') {
            await Vehicle.find({
                $and: [AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (subareaAll.some(e => e.SubAreaName === element.SubAreaName) == false) {
                        subareaAll.push({ SubAreaName: element.SubAreaName })
                    }
                }
            })
        }

        if (!which || which == 'people') {
            await People.find({
                $and: [AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (subareaAll.some(e => e.SubAreaName === element.SubAreaName) == false) {
                        subareaAll.push({ SubAreaName: element.SubAreaName })
                    }
                }
            })
        }


        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: subareaAll }))
        data = JSON.parse(data)
        return res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}
const wpmSubareaAll = async (req, res) => {

    try {


        // let application_id = '62a4d4c622bdf92ba30d1633'
        // await permission(application_id, req)


        let wpmSubareaAll = []


        let AreaName = {}
        if (req.query.WPM_AreaName && !req.query.WPM_AreaName.toString().includes('ทั้งหมด')) {
            AreaName = { AreaName: { $in: sanitize(req.query.WPM_AreaName) } }
        }

        let AreaName_workpermit = {}
        if (req.query.WPM_AreaName && !req.query.WPM_AreaName.toString().includes('ทั้งหมด')) {
            AreaName_workpermit = { location: { $in: sanitize(req.query.WPM_AreaName) } }
        }

        let WPM_AreaName = {}
        if (req.query.WPM_AreaName && !req.query.WPM_AreaName.toString().includes('ทั้งหมด')) {
            WPM_AreaName = { WPM_AreaName: { $in: sanitize(req.query.WPM_AreaName) } }
        }


        let which = {}
        if (req.query.which && !req.query.which.toString().includes('ทั้งหมด')) {
            which = req.query.which
        }
        // which = (which) ? { which: { $in: WPM_AreaName } } : 


        if (!which || which == 'workpermit') {
            await WorkPermit.find({
                $and: [AreaName_workpermit]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (wpmSubareaAll.some(e => e.WPM_SubAreaName === element.subLocation) == false) {
                        wpmSubareaAll.push({ WPM_SubAreaName: element.subLocation })
                    }

                }
            })
        }

        if (!which || which == 'scaffolding') {
            await Scaffolding.find({
                $and: [AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (wpmSubareaAll.some(e => e.WPM_SubAreaName === element.SubAreaName) == false) {
                        wpmSubareaAll.push({ WPM_SubAreaName: element.SubAreaName })
                    }
                }
            })

        }


        if (!which || which == 'vehicle') {
            await Vehicle.find({
                $and: [WPM_AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (wpmSubareaAll.some(e => e.WPM_SubAreaName === element.WPM_SubAreaName) == false && element.WPM_SubAreaName) {
                        wpmSubareaAll.push({ WPM_SubAreaName: element.WPM_SubAreaName })
                    }
                }
            })
        }

        if (!which || which == 'people') {
            await People.find({
                $and: [WPM_AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    if (wpmSubareaAll.some(e => e.WPM_SubAreaName === element.WPM_SubAreaName) == false && element.WPM_SubAreaName) {
                        wpmSubareaAll.push({ WPM_SubAreaName: element.WPM_SubAreaName })
                    }
                }
            })
        }


        if (!which || which == 'accesscontrol') {
            let AccDeviceName_master = await AccessControlDevice.find({})
            await AccessControl.find({
                $and: [AreaName]
            }).then(res => {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    let join_access_control_device = AccDeviceName_master.filter(el => { return el.AccDeviceID == element.ACC_ID })
                    if (join_access_control_device.length > 0) {
                        element.SubAreaName = join_access_control_device[0].SubAreaName
                        if (wpmSubareaAll.some(e => e.WPM_SubAreaName === element.SubAreaName) == false) {
                            wpmSubareaAll.push({ WPM_SubAreaName: element.SubAreaName })
                        }
                    }
                }
            })
        }


        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: wpmSubareaAll }))
        data = JSON.parse(data)
        return res.send(data)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}


export { pttstaffcodeAll, subareaAll, wpmSubareaAll };
