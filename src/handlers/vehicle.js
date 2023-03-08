
import Vehicle from "../models/Vehicle/Vehicle.js";
import Location from "../models/Master/Location/Location.js";
// import modelVehicleType from "../models/Master/VehicleType/VehicleType.js";
import _ from 'lodash'
import User from '../models/User/User.js';
import { permission } from '../preHandlers/permission.js';
import Role from '../models/Role/Role.js';
import PeopleRestrict from '../models/PeopleRestrict/PeopleRestrict.js';
import Vehicle5 from '../models/Vehicle5/Vehicle5.js';
import Vehicle6 from '../models/Vehicle6/Vehicle6.js';
import moment from "moment"
import Vehicle2 from '../models/Vehicle2/Vehicle2.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {

        let application_id = '62a4d4a822bdf92ba30d162b'
        await permission(application_id, req)

        //delete row
        await Vehicle.deleteMany({
            Remove_GPS: { $lte: new Date().toISOString().split('T')[0], $ne: "" }
        })

        let filter = {
            AgencyName: [{ AgencyName: 'ทั้งหมด' }],
            PTTStaffCode: [{ PTTStaffCode: 'ทั้งหมด', PTTStaff: 'ทั้งหมด' }],
            AreaName: [{ AreaName: 'ทั้งหมด' }],
            SubAreaName: [{ SubAreaName: 'ทั้งหมด' }],
            WPM_AreaName: [{ WPM_AreaName: 'ทั้งหมด' }],
            WPM_SubAreaName: [{ WPM_SubAreaName: 'ทั้งหมด' }],
            VehicleType: [{ VehicleType: 'ทั้งหมด' }],
            CompanyName: [{ CompanyName: 'ทั้งหมด' }],
            notification: [{ notification: 'ทั้งหมด' }],
        }

        let where_permission = {}
        let In = 0
        let out = 0
        let drive_out_control_area = 0
        let park_undefine_spot = 0
        let over_speed = 0
        let enter_forbidden_area = 0
        let remain = 0

        let data_arr = []

        const today = moment().startOf('day')

        let AgencyName = {}
        if (req.query.AgencyName && !req.query.AgencyName.toString().includes('ทั้งหมด')) {
            AgencyName = { AgencyName: { $in: sanitize(req.query.AgencyName) } }
        }

        let PTTStaffCode = {}
        if (req.query.PTTStaffCode && !req.query.PTTStaffCode.toString().includes('ทั้งหมด')) {
            PTTStaffCode = { PTTStaffCode: { $in: sanitize(req.query.PTTStaffCode) } }
        }

        let WorkingStartDate = {}
        if (req.query.WorkingStartDate) {
            WorkingStartDate = { 'others.WorkingStart': { $gte: sanitize(req.query.WorkingStartDate) } }
        }


        let WorkingEndDate = {}
        if (req.query.WorkingEndDate) {
            WorkingEndDate = { 'others.WorkingEnd': { $lte: sanitize(req.query.WorkingEndDate) } }
        }


        let AreaName = {}
        if (req.query.AreaName && !req.query.AreaName.toString().includes('ทั้งหมด')) {
            AreaName = { AreaName: { $in: sanitize(req.query.AreaName) } }
        }

        let SubAreaName = {}
        if (req.query.SubAreaName && !req.query.SubAreaName.toString().includes('ทั้งหมด')) {
            SubAreaName = { SubAreaName: { $in: sanitize(req.query.SubAreaName) } }
        }

        let WPM_AreaName = {}
        if (req.query.WPM_AreaName && !req.query.WPM_AreaName.toString().includes('ทั้งหมด')) {
            WPM_AreaName = { WPM_AreaName: { $in: sanitize(req.query.WPM_AreaName) } }
        }

        let WPM_SubAreaName = {}
        if (req.query.WPM_SubAreaName && !req.query.WPM_SubAreaName.toString().includes('ทั้งหมด')) {
            WPM_SubAreaName = { WPM_SubAreaName: { $in: sanitize(req.query.WPM_SubAreaName) } }
        }

        let VehicleType = {}
        if (req.query.VehicleType && !req.query.VehicleType.toString().includes('ทั้งหมด')) {
            VehicleType = { VehicleType: { $in: sanitize(req.query.VehicleType) } }
        }

        let CompanyName = {}
        if (req.query.CompanyName && !req.query.CompanyName.toString().includes('ทั้งหมด')) {
            CompanyName = { CompanyName: { $in: sanitize(req.query.CompanyName) } }
        }

        let Notification = []
        if (req.query.notification && !req.query.notification.toString().includes('ทั้งหมด')) {
            Notification = req.query.notification
        }


        let check_user = await User.findOne().where({ _id: req._id })

        let now = new Date
        let day_7 = new Date().setDate(new Date().getDate() + 7);

        //เจ้าของพื้นที่
        if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {

            // if (Object.keys(req.query).length === 0) {
            //     let location1 = await Vehicle.find({ OwnerCode: check_user.others.employeeid })
            //     where_permission = { WPM_AreaName: { $in: location1.map(el => { return el.WPM_AreaName }) } }
            // }
        }
        //ผู้ควบคุมงาน ปตท.
        else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission = { PTTStaffCode: check_user.others.employeeid }
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

        let role = await Role.find().where({ group_id: check_user.group_id })

        // แสดงภาพรวมยานพาหนะ โดยมี Icon แสดงแยกตามชนิดยานพาหนะ
        let over_all_check = role.filter((el) => { return el.application_id == '63050c06d8a5e16460b2d6f9' })

        // แสดงยานพาหนะเข้าพื้นที่ (In)
        let in_check = role.filter((el) => { return el.application_id == '63050c82d8a5e16460b2d706' })

        //แสดงยานพาหนะออกพื้นที่ (Out)
        let out_check = role.filter((el) => { return el.application_id == '63050c98d8a5e16460b2d70c' })

        //แสดงการแจ้งเตือนขับนอกพื้นที่ควบคุม
        let drive_out_control_area_check = role.filter((el) => { return el.application_id == '63050ce6d8a5e16460b2d712' })

        //แสดงการแจ้งเตือนการเข้านในพื้นที่ห้ามเข้า
        let enter_forbidden_area_check = role.filter((el) => { return el.application_id == '63050cfcd8a5e16460b2d718' })

        //แสดงการแจ้งเตือนจอดในจุดที่ไม่ได้กำหนด
        let park_undefine_spot_check = role.filter((el) => { return el.application_id == '63050d0dd8a5e16460b2d71e' })

        //แสดงการแจ้งเตือนการใช้ความเร็วรถเกินความเร็วที่กำหนด
        let over_speed_check = role.filter((el) => { return el.application_id == '63050d33d8a5e16460b2d724' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล
        let search_check = role.filter((el) => { return el.application_id == '63050d78d8a5e16460b2d72a' })

        //แสดง remain
        let remain_check = role.filter((el) => { return el.application_id == '63050eb7368a0ca0895a0930' })


        let AreaName_master = await Location.find()
        // let VehicleType_master = await modelVehicleType.find()


        // .then((result) => {
        //     // if (element.Vehicle6) {
        //     for (let index = 0; index < result.length; index++) {
        //         const element = result[index]._doc;
        //         // if (element.DateTime_In && (element.DateTime_In >= today.toDate() && element.DateTime_In <= moment(today).endOf('day').toDate())) {
        //         if (element.DateTime_In && (element.DateTime_In >= today.toDate() && element.DateTime_In <= new Date())) {
        //             In = In + 1
        //         }
        //         if (element.DateTime_Out && (element.DateTime_Out >= today.toDate() && element.DateTime_In <= new Date())) {
        //             out = out + 1

        //         }

        //     }
        //     return result
        //     // }
        // })

        await Vehicle.find({
            // $and: [
            //     where_permission
            // ]
        }).then((result) => {

            for (let index = 0; index < result.length; index++) {
                const element = result[index];

                if (filter.AgencyName.some(e => e.AgencyName === element.AgencyName) == false) {
                    filter.AgencyName.push({ AgencyName: element.AgencyName })
                }

                if (req.query.AgencyName) {
                    if (req.query.AgencyName.toString().includes(element.AgencyName) || req.query.AgencyName.toString().includes('ทั้งหมด')) {
                        if (filter.PTTStaffCode.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                            filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffName })
                        }
                    }
                } else {
                    if (filter.PTTStaffCode.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffName })
                    }
                }

                if (element.AreaName && filter.AreaName.some(e => e.AreaName === element.AreaName) == false) {
                    filter.AreaName.push({
                        ...(AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]) ?
                            AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]._doc : {},
                        AreaName: element.AreaName
                    })
                }


                if (req.query.AreaName) {
                    if (req.query.AreaName.toString().includes(element.AreaName) || req.query.AreaName.toString().includes('ทั้งหมด')) {
                        if (filter.SubAreaName.some(e => e.SubAreaName === element.SubAreaName) == false) {
                            filter.SubAreaName.push({
                                SubAreaName: element.SubAreaName
                            })
                        }
                    }
                } else {
                    if (filter.SubAreaName.some(e => e.SubAreaName === element.SubAreaName) == false) {
                        filter.SubAreaName.push({
                            SubAreaName: element.SubAreaName
                        })
                    }
                }

                if (element.WPM_AreaName && filter.WPM_AreaName.some(e => e.WPM_AreaName === element.WPM_AreaName) == false) {
                    filter.WPM_AreaName.push({
                        ...(AreaName_master.filter(el => { return el.Location_Name == element.WPM_AreaName })[0]) ?
                            AreaName_master.filter(el => { return el.Location_Name == element.WPM_AreaName })[0]._doc : {},
                        WPM_AreaName: element.WPM_AreaName
                    })
                }

                if (req.query.WPM_AreaName) {
                    if (req.query.WPM_AreaName.toString().includes(element.WPM_AreaName) || req.query.WPM_AreaName.toString().includes('ทั้งหมด')) {
                        if (filter.WPM_SubAreaName.some(e => e.WPM_SubAreaName === element.WPM_SubAreaName) == false) {
                            filter.WPM_SubAreaName.push({
                                WPM_SubAreaName: element.WPM_SubAreaName
                            })
                        }
                    }
                } else {
                    if (filter.WPM_SubAreaName.some(e => e.WPM_SubAreaName === element.WPM_SubAreaName) == false) {
                        filter.WPM_SubAreaName.push({
                            WPM_SubAreaName: element.WPM_SubAreaName
                        })
                    }
                }

                if (filter.VehicleType.some(e => e.VehicleType === element.VehicleType) == false) {
                    filter.VehicleType.push({ VehicleType: element.VehicleType })
                }


                if (filter.CompanyName.some(e => e.CompanyName === element.CompanyName) == false) {
                    filter.CompanyName.push({ CompanyName: element.CompanyName })
                }

            }
        })

        if (drive_out_control_area_check.length > 0) {
            filter.notification.push({ notification: 'drive_out_control_area' })
        }

        if (enter_forbidden_area_check.length > 0) {
            filter.notification.push({ notification: 'enter_forbidden_area' })
        }

        if (park_undefine_spot_check.length > 0) {
            filter.notification.push({ notification: 'park_undefine_spot' })

        }
        if (over_speed_check.length > 0) {
            filter.notification.push({ notification: 'over_speed' })

        }


        let Notification_ = {}
        if (typeof Notification == 'string') {
            Notification = [Notification]
        }
        if (Notification.length > 0) {
            Notification_.$or = []
        }
        if (Notification.includes('drive_out_control_area')) {
            Notification_.$or.push({ WarningStatusId: { $in: ['s01'] } })
        }
        if (Notification.includes('enter_forbidden_area')) {
            Notification_.$or.push({ WarningStatusId: { $in: ['s05'] } })
        }
        if (Notification.includes('park_undefine_spot')) {
            Notification_.$or.push({ WarningStatusId: { $in: ['s02'] } })
        }
        if (Notification.includes('over_speed')) {
            Notification_.$or.push({ WarningStatusId: { $in: ['s03', 's04'] } })
        }


        let vehicle5 = await Vehicle5.find()

        let in_out = await Vehicle6.findOne()
        if (in_out) {
            In = parseInt(in_out.VehicleInCount)
            out = parseInt(in_out.VehicleOutCount)
        }



        await Vehicle.find({
            $and: [
                where_permission,
                PTTStaffCode,
                AgencyName,
                WorkingStartDate,
                WorkingEndDate,
                AreaName,
                SubAreaName,
                WPM_AreaName,
                WPM_SubAreaName,
                CompanyName,
                VehicleType,
                Notification_
            ]
        }).then((result) => {
            for (let index = 0; index < result.length; index++) {

                let notification = {
                    drive_out_control_area: false,
                    enter_forbidden_area: false,
                    park_undefine_spot: false,
                    over_speed: false
                }

                const element = result[index]._doc;
                element.notification = {}

                element.others.show_in_map = true
                element.others.on_table = true

                let join_vehicle5 = vehicle5.filter(el => { return el.id == element.VehicleTypeID })
                element.Vehicle5 = (join_vehicle5.length > 0) ? join_vehicle5[0] : null


                // let join_vehicle6 = vehicle6.filter(el => { return el.VehicleID == element.VehicleID })

                // if (join_vehicle6.length > 0) {
                //     element.Vehicle6 = join_vehicle6[0]

                //     // if (join_vehicle6[0].DateTime_In && (join_vehicle6[0].DateTime_In >= today.toDate() && join_vehicle6[0].DateTime_In <= new Date())) {
                //     //     In = In + 1
                //     // }
                //     // if (join_vehicle6[0].DateTime_Out && (join_vehicle6[0].DateTime_Out >= today.toDate() && join_vehicle6[0].DateTime_Out <= new Date())) {
                //     //     out = out + 1

                //     // }
                // } else {
                //     element.Vehicle6 = null
                // }


                if (element.WarningStatusId) {
                    if (element.WarningStatusId.includes('s01')) {
                        drive_out_control_area = drive_out_control_area + 1
                        notification.drive_out_control_area = true

                    }
                    if (element.WarningStatusId.includes('s02')) {
                        park_undefine_spot = park_undefine_spot + 1
                        notification.park_undefine_spot = true

                    }
                    if (element.WarningStatusId.includes('s03') || element.WarningStatusId.includes('s04')) {
                        over_speed = over_speed + 1
                        notification.over_speed = true

                    }
                    if (element.WarningStatusId.includes('s05')) {
                        enter_forbidden_area = enter_forbidden_area + 1
                        notification.enter_forbidden_area = true


                    }
                }


                if (drive_out_control_area_check.length > 0) {
                    element.notification.drive_out_control_area = notification.drive_out_control_area
                }
                if (park_undefine_spot_check.length > 0) {
                    element.notification.park_undefine_spot = notification.park_undefine_spot
                }
                if (over_speed_check.length > 0) {
                    element.notification.over_speed = notification.over_speed
                }
                if (enter_forbidden_area_check.length > 0) {
                    element.notification.enter_forbidden_area = notification.enter_forbidden_area

                }



                delete element._id
                delete element.__v

                remain = remain + 1
                data_arr.push(element)

            }
        })

        let data = {}
        data.summary = {}
        data.filter = {}
        data.data = []

        if (over_all_check.length > 0) {

            data.summary = {}
            if (in_check.length > 0) {
                data.summary.in = In
            }
            if (out_check.length > 0) {
                data.summary.out = out
            }
            if (remain_check.length > 0) {
                data.summary.remain = remain
            }
            if (drive_out_control_area_check.length > 0) {
                data.summary.drive_out_control_area = drive_out_control_area
            }

            if (park_undefine_spot_check.length > 0) {
                data.summary.park_undefine_spot = park_undefine_spot
            }

            if (over_speed_check.length > 0) {
                data.summary.over_speed = over_speed
            }

            if (enter_forbidden_area_check.length > 0) {
                data.summary.enter_forbidden_area = enter_forbidden_area
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
        if (check_user.others.employeeid && check_user.group_id == "62a4cb17e0a99b4456aaf51e" && Object.keys(req.query).length === 0 && data_arr.length == 0) {
            data_.MessageAlert = 'ไม่พบข้อมูลใบงานที่คุณเป็นผู้ควบคุมงาน กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        res.send(data_)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}

const vehicle2 = async (req, res) => {

    try {

        let application_id = '62a4d4a822bdf92ba30d162b'
        await permission(application_id, req)


        //delete row
        await Vehicle2.deleteMany({
            Remove_Park: { $lte: new Date().toISOString().split('T')[0], $ne: "" }
        })

        let data_arr = await Vehicle2.find()
        let data = {}
        data.data = data_arr



        data = sanitizeHtml(JSON.stringify({ Status: "success", Message: data }))
        data = JSON.parse(data)
        return res.send(data)
    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}



export { all, vehicle2 };
