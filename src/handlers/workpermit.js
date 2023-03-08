
import WorkPermit from "../models/WorkPermit/WorkPermit.js";
import _ from 'lodash'
import User from "../models/User/User.js";
import Group from "../models/Group/Group.js";
import WorkpermitStatus from "../models/Master/WorkpermitStatus/WorkpermitStatus.js";
import WorkpermitType from "../models/Master/WorkpermitType/WorkpermitType.js";
import Application from "../models/Application/Application.js";
import Location_master_ from "../models/Master/Location/Location.js";
import config from "../utils/config.js";
import Role from "../models/Role/Role.js";
import { permission } from "../preHandlers/permission.js";
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {


        let application_id = '62a4d45011b91829618a4413'
        await permission(application_id, req)

        let supervisorDep = {}
        if (req.query.supervisorDep && !req.query.supervisorDep.toString().includes('ทั้งหมด')) {
            supervisorDep = { supervisorDep: { $in: sanitize(req.query.supervisorDep) } }
        }

        let supervisorCode = {}
        if (req.query.supervisorCode && !req.query.supervisorCode.toString().includes('ทั้งหมด')) {
            supervisorCode = { supervisorCode: { $in: sanitize(req.query.supervisorCode) } }
        }


        let workpermitStatusId = {}
        if (req.query.workpermitStatusId && !req.query.workpermitStatusId.toString().includes('ทั้งหมด')) {
            workpermitStatusId = { workpermitStatusId: { $in: sanitize(req.query.workpermitStatusId) } }
        }


        let startDateTime = {}
        if (req.query.startDateTime) {
            startDateTime = { 'others.workingStart': { $gte: sanitize(req.query.startDateTime) } }
        }

        let endDateTime = {}
        if (req.query.endDateTime) {
            endDateTime = { 'others.workingEnd': { $lte: sanitize(req.query.endDateTime) } }
        }

        let workTypeID = {}
        if (req.query.workTypeID && !req.query.workTypeID.toString().includes('ทั้งหมด')) {
            workTypeID = { workTypeID: { $in: sanitize(req.query.workTypeID) } }
        }

        let location = {}
        if (req.query.location && !req.query.location.toString().includes('ทั้งหมด')) {
            location = { location: { $in: sanitize(req.query.location) } }
        }

        let subLocation = {}
        if (req.query.subLocation && !req.query.subLocation.toString().includes('ทั้งหมด')) {
            subLocation = { subLocation: { $in: sanitize(req.query.subLocation) } }
        }

        let companyName = {}
        if (req.query.companyName && !req.query.companyName.toString().includes('ทั้งหมด')) {
            companyName = { companyName: { $in: sanitize(req.query.companyName) } }
        }

        let Notification = []
        if (req.query.notification && !req.query.notification.toString().includes('ทั้งหมด')) {
            Notification = req.query.notification
        }

        let check_user = await User.findOne().where({ _id: req._id })

        let where_permission = {}
        let gas_check_hour = null

        let filter = {
            supervisorDep: [{ supervisorDep: 'ทั้งหมด' }],
            supervisorCode: [{ supervisorCode: 'ทั้งหมด', supervisor: 'ทั้งหมด' }],
            workpermitStatusId: [{ workpermitStatusId: 'ทั้งหมด' }],
            workTypeID: [{ workTypeID: 'ทั้งหมด', WP_Type_Name: 'ทั้งหมด' }],
            location: [{ location: 'ทั้งหมด' }],
            subLocation: [{ subLocation: 'ทั้งหมด' }],
            WorkPermitNo: [{ WorkPermitNo: 'ทั้งหมด' }],
            companyName: [{ companyName: 'ทั้งหมด' }],
            notification: [{ notification: 'ทั้งหมด' }],

        }
        let data_arr = []
        let total = 0
        let open = 0
        let close = 0
        let gas = 0
        let near_expire = 0
        let expire = 0
        let impairment = 0
        let impairment_2 = 0


        let ONE_HOUR = 60 * 60 * 1000; /* ms */

        //เจ้าของพื้นที่
        if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
            // if (Object.keys(req.query).length === 0) {
            //     let location1 = await WorkPermit.find({ approverCode: check_user.others.employeeid })
            //     where_permission = { location: { $in: location1.map(el => { return el.location }) } }
            // }
            gas_check_hour = 3

        }
        //ผู้ควบคุมงาน ปตท.
        else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission = { supervisorCode: check_user.others.employeeid }
            }
            gas_check_hour = 1
        }
        //เจ้าหน้าที่รักษาความปลอดภัย
        else if (check_user.group_id == "62a4cb26e0a99b4456aaf522") {

        }
        //หน่วยงาน ปภ.ผยก.
        else if (check_user.group_id == "62a4cb5896deebf8a1f8abbe") {

        }

        //ผู้ดูแลระบบ
        else if (check_user.group_id == "62a4cb7696deebf8a1f8abc9") {
            gas_check_hour = 1
        }

        let role = await Role.find().where({ group_id: check_user.group_id })


        // แสดงภาพรวมการขออนุญาตทำงาน โดยมี Icon สีแสดงแยกประเภทใบอนุญาตทำงาน
        let over_all_check = role.filter((el) => { return el.application_id == '62ac79852434683669fade56' })

        // แสดงภาพรวมสถานะเปิด – ปิดใบอนุญาตทำงานโดยมี Icon สี แสดงสถานะใบอนุญาตทำงาน
        let open_close_check = role.filter((el) => { return el.application_id == '62ac7ba06d4a8ed8930557d7' })

        //แสดงสถานะอุปกรณ์ที่ Impairment โดยมี Icon สี แสดงสถานะอุปกรณ์
        let impairment_chek = role.filter((el) => { return el.application_id == '62ac7c1d2704eb8aa472f123' })

        //แสดงการแจ้งเตือนรอบการวัดก๊าซ โดยมี Icon สี เพื่อแจ้งเตือน
        let gas_check = role.filter((el) => { return el.application_id == '62ac7cfa08889e4f8e123218' })

        //แสดงการแจ้งเตือนเมื่อใบอนุญาตทำงานใกล้หมดอายุการขออนุญาตในแต่ละวัน ชั่วโมง โดยมี Icon สี เพื่อแจ้งเตือน
        let near_expire_check = role.filter((el) => { return el.application_id == '62ac7d3608889e4f8e123225' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล โดยเมนู Search สามารถทำการเปิด-ปิด หน้าต่างการค้นหาได้ เพื่อเพิ่มพื้นที่การแสดงผลของ Dashboard
        let search_check = role.filter((el) => { return el.application_id == '62ac7d8a08889e4f8e123232' })

        //แสดงการแจ้งเตือนเมื่อใบอนุญาตทำงานหมดอายุ
        let expire_check = role.filter((el) => { return el.application_id == '6341629b0e315503b7ab40fb' })


        // let check_run_no = await WorkPermit.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
        // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0


        let WorksheetStatusId_master = await WorkpermitStatus.find()
        let WorkTypeID_master = await WorkpermitType.find()
        let Location_master = await Location_master_.find()

        await WorkPermit.find({
            // $and: [
            //     where_permission
            // ]
        }).then((result) => {
            for (let index = 0; index < result.length; index++) {
                const element = result[index]._doc;

                if (filter.supervisorDep.some(e => e.supervisorDep === element.supervisorDep) == false) {
                    filter.supervisorDep.push({ supervisorDep: element.supervisorDep })
                }

                if (req.query.supervisorDep) {
                    if (req.query.supervisorDep.toString().includes(element.supervisorDep) || req.query.supervisorDep.toString().includes('ทั้งหมด')) {
                        if (filter.supervisorCode.some(e => e.supervisorCode === element.supervisorCode) == false) {
                            filter.supervisorCode.push({ supervisorCode: element.supervisorCode, supervisor: element.supervisorFName + ' ' + element.supervisorLName })
                        }
                    }
                } else {
                    if (filter.supervisorCode.some(e => e.supervisorCode === element.supervisorCode) == false) {
                        filter.supervisorCode.push({ supervisorCode: element.supervisorCode, supervisor: element.supervisorFName + ' ' + element.supervisorLName })
                    }
                }

                if (filter.workpermitStatusId.some(e => e.workpermitStatusId === element.workpermitStatusId) == false) {
                    filter.workpermitStatusId.push({
                        ...(WorksheetStatusId_master.filter(el => { return el.Status_ID == element.workpermitStatusId })[0]) ?
                            WorksheetStatusId_master.filter(el => { return el.Status_ID == element.workpermitStatusId })[0]._doc : {},
                        workpermitStatusId: element.workpermitStatusId
                    })
                }
                if (filter.workTypeID.some(e => e.workTypeID === element.workTypeID) == false) {
                    filter.workTypeID.push({
                        ...(WorkTypeID_master.filter(el => { return el.WP_Type_ID == element.workTypeID })[0]) ?
                            WorkTypeID_master.filter(el => { return el.WP_Type_ID == element.workTypeID })[0]._doc : {},
                        workTypeID: element.workTypeID
                    })
                }

                if (filter.location.some(e => e.location === element.location) == false) {
                    filter.location.push({
                        ...(Location_master.filter(el => { return el.Location_Name == element.location })[0]) ?
                            Location_master.filter(el => { return el.Location_Name == element.location })[0]._doc : {},
                        location: element.location
                    })
                }

                if (req.query.location) {
                    if (req.query.location.toString().includes(element.location) || req.query.location.toString().includes('ทั้งหมด')) {
                        if (filter.subLocation.some(e => e.subLocation === element.subLocation) == false) {
                            filter.subLocation.push({
                                subLocation: element.subLocation
                            })
                        }
                    }
                } else {
                    if (filter.subLocation.some(e => e.subLocation === element.subLocation) == false) {
                        filter.subLocation.push({
                            subLocation: element.subLocation
                        })
                    }
                }

                if (filter.companyName.some(e => e.companyName === element.companyName) == false) {
                    filter.companyName.push({ companyName: element.companyName })
                }


            }

        })

        if (expire_check.length > 0) {
            filter.notification.push({ notification: 'expire' })
        }

        if (near_expire_check.length > 0) {
            filter.notification.push({ notification: 'near_expire' })
        }

        if (gas_check.length > 0) {
            filter.notification.push({ notification: 'gas' })

        }
        if (impairment_chek.length > 0) {
            filter.notification.push({ notification: 'impairment' })
            filter.notification.push({ notification: 'impairment_2' })
        }


        let Notification_ = {}
        if (typeof Notification == 'string') {
            Notification = [Notification]
        }
        if (Notification.length > 0) {
            Notification_.$or = []
        }
        if (Notification.includes('near_expire')) {
            Notification_.$or.push({ $and: [{ 'others.workingEnd': { $gte: new Date() } }, { 'others.workingEnd': { $lt: new Date().getTime() + ONE_HOUR } }] })
        }
        if (Notification.includes('expire')) {
            Notification_.$or.push({ 'others.workingEnd': { $lt: new Date() } })
        }
        if (Notification.includes('gas')) {
            Notification_.$or.push({ gasMeasurement: { $lte: new Date().getTime() - gas_check_hour * ONE_HOUR } })
        }

        if (Notification.includes('impairment')) {
            Notification_.$or.push({ "impairmentName.0": { "$exists": true }, impairmentName: { $ne: [""] } })
        }

        if (Notification.includes('impairment_2')) {
            Notification_.$or.push({ "impairmentStatus": { $in: [2, '2'] } })
        }


        let chek_status = await WorkpermitStatus.find()

        await WorkPermit.find({
            $and: [
                where_permission,
                supervisorCode,
                supervisorDep,
                startDateTime,
                endDateTime,
                workpermitStatusId,
                workTypeID,
                location,
                subLocation,
                companyName,
                Notification_
            ]
        }).then(async (result) => {
            for (let index = 0; index < result.length; index++) {
                let notification = {
                    near_expire: false,
                    expire: false,
                    gas: false,
                    impairment: false,
                    impairment_2: false
                }

                const element = result[index]._doc;
                element.notification = {}

                element.others.show_in_map = true
                element.others.on_table = true



                if (element.others.workingEnd) {
                    let workingEnd = element.others.workingEnd
                    if (workingEnd >= new Date() && workingEnd < new Date().getTime() + ONE_HOUR) {
                        near_expire = near_expire + 1
                        notification.near_expire = true
                    }

                    if (workingEnd < new Date()) {
                        expire = expire + 1
                        notification.expire = true
                    }
                }

                if (gas_check.length > 0) {
                    let gasMeasurement = new Date(element.gasMeasurement)
                    if (gasMeasurement <= new Date().getTime() - (gas_check_hour * ONE_HOUR)) {
                        gas = gas + 1
                        notification.gas = true
                    }
                }

                // element.impairmentName = element.impairmentName.filter(function (e) { return e != "" })

                if (impairment_chek.length > 0) {
                    if (element.impairmentName.length > 0 && _.isEqual(element.impairmentName, [""]) == false) {
                        impairment = impairment + 1
                        notification.impairment = true
                        if (element.impairmentStatus.includes(2)) {
                            impairment_2 = impairment_2 + 1
                            notification.impairment_2 = true
                        }
                    }
                }


                let check = chek_status.filter(function (el) {
                    return el.Status_ID == element.workpermitStatusId
                });

                if (check.length > 0 && check[0].IsOpen == true) {
                    open = open + 1
                    element.others.workpermitStatusId = 'OPEN'
                } else {
                    close = close + 1
                    element.others.workpermitStatusId = 'CLOSE'
                    element.others.show_in_map = false
                    element.others.on_table = false
                }



                if (expire_check.length > 0) {
                    element.notification.expire = notification.expire

                }

                if (near_expire_check.length > 0) {
                    element.notification.near_expire = notification.near_expire

                }

                if (gas_check.length > 0) {
                    element.notification.gas = notification.gas

                }

                if (impairment_chek.length > 0) {
                    element.notification.impairment = notification.impairment

                    element.notification.impairment_2 = notification.impairment_2

                }


                total = total + 1
                data_arr.push(element)

            }

        })

        let data = {}

        data.summary = {}
        data.filter = {}
        data.data = []
        if (over_all_check.length > 0) {
            data.summary = {
                total: total
            }
            if (expire_check.length > 0) {
                data.summary.expire = expire
            }
            if (near_expire_check.length > 0) {
                data.summary.near_expire = near_expire
            }
            if (open_close_check.length > 0) {
                data.summary.open = open
                data.summary.close = close
            }
            if (gas_check.length > 0) {
                data.summary.gas = gas
            }
            if (impairment_chek.length > 0) {
                data.summary.impairment = impairment
                data.summary.impairment_2 = impairment_2

            }
            data.data = data_arr
        }

        if (search_check.length > 0) {
            data.filter = filter
        }

        let data_ = {
            Status: 'success',
            Message: data
        }
        console.log(check_user)
        if (check_user.others.employeeid && check_user.group_id == "62a4cb17e0a99b4456aaf51e" && Object.keys(req.query).length === 0 && data_arr.length == 0) {
            data_.MessageAlert = 'ไม่พบข้อมูลใบงานที่คุณเป็นผู้ควบคุมงาน กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        res.send(data_)
        // if (res)
        //     return data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        res.send(data)
    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}

export { all };
