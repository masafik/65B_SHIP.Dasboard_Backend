
import Scaffolding from "../models/Scaffolding/Scaffolding.js";
import Location from "../models/Master/Location/Location.js";
import modelScaffoldingType from "../models/Master/ScaffoldingType/ScaffoldingType.js";
import _ from 'lodash'
import User from '../models/User/User.js';
import { permission } from '../preHandlers/permission.js';
import Role from '../models/Role/Role.js';
import socket_io from "../utils/socket_io.js";
import config from '../utils/config.js';
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {


        let application_id = '62a4d4c622bdf92ba30d1633'
        await permission(application_id, req)

        let filter = {
            AgencyName: [{ AgencyName: 'ทั้งหมด' }],
            PTTStaffCode: [{ PTTStaffCode: 'ทั้งหมด', PTTStaff: 'ทั้งหมด', }],
            AreaName: [{ AreaName: 'ทั้งหมด' }],
            SubAreaName: [{ SubAreaName: 'ทั้งหมด' }],
            ScaffoldingType: [{ ScaffoldingType: 'ทั้งหมด' }],
            VendorName: [{ VendorName: 'ทั้งหมด' }],
            notification: [{ notification: 'ทั้งหมด' }],
        }
        let where_permission = {}
        let all = 0
        let expire = 0
        let near_expire = 0
        let normal = 0
        let no_check = 0
        let data_arr = []


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
            WorkingStartDate = { WorkingStartDate: { $gte: sanitize(req.query.WorkingStartDate) } }
        }


        let WorkingEndDate = {}
        if (req.query.WorkingEndDate) {
            WorkingEndDate = { WorkingEndDate: { $lte: sanitize(req.query.WorkingEndDate) } }
        }

        let AreaName = {}
        if (req.query.AreaName && !req.query.AreaName.toString().includes('ทั้งหมด')) {
            AreaName = { AreaName: { $in: sanitize(req.query.AreaName) } }
        }

        let SubAreaName = {}
        if (req.query.SubAreaName && !req.query.SubAreaName.toString().includes('ทั้งหมด')) {
            SubAreaName = { SubAreaName: { $in: sanitize(req.query.SubAreaName) } }
        }

        let VendorName = {}
        if (req.query.VendorName && !req.query.VendorName.toString().includes('ทั้งหมด')) {
            VendorName = { VendorName: { $in: sanitize(req.query.VendorName) } }
        }

        let ScaffoldingType = {}
        if (req.query.ScaffoldingType && !req.query.ScaffoldingType.toString().includes('ทั้งหมด')) {
            ScaffoldingType = req.query.ScaffoldingType

            if (typeof ScaffoldingType == 'string') {
                ScaffoldingType = [ScaffoldingType]
            }

            let ScaffoldingType_ = {
                $or: [
                    {
                        ScaffoldingType: {
                            $in: []
                        }
                    }
                ]
            }
            for (let index = 0; index < ScaffoldingType.length; index++) {
                const element = sanitize(ScaffoldingType[index]);
                if (element.split(' - ').length > 1) {
                    ScaffoldingType_.$or.push({
                        ScaffoldingType: element.split(' - ')[0],
                        ScaffoldingSubType: element.split(' - ')[1],
                    })
                } else {
                    ScaffoldingType_.$or[0].ScaffoldingType.$in.push(element)
                }

            }

            ScaffoldingType = ScaffoldingType_
        }


        let Notification = []
        if (req.query.notification && !req.query.notification.toString().includes('ทั้งหมด')) {
            Notification = req.query.notification
        }


        let check_user = await User.findOne().where({ _id: sanitize(req._id) })

        let now = new Date
        let day_7 = new Date().setDate(new Date().getDate() + 7);

        //เจ้าของพื้นที่
        // if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {

        //     // if (Object.keys(req.query).length === 0) {
        //     //     let location1 = await Scaffolding.find({ Owner: check_user.others.employeeid })
        //     //     where_permission = { AreaName: { $in: location1.map(el => { return el.AreaName }) } }

        //     // }
        // }
        //ผู้ควบคุมงาน ปตท.
        if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission = { PTTStaffCode: sanitize(check_user.others.employeeid) }
            }
        }
        // //เจ้าหน้าที่รักษาความปลอดภัย
        // else if (check_user.group_id == "62a4cb26e0a99b4456aaf522") {

        // }
        // //หน่วยงาน ปภ.ผยก.
        // else if (check_user.group_id == "62a4cb5896deebf8a1f8abbe") {

        // }

        // //ผู้ดูแลระบบ
        // else if (check_user.group_id == "62a4cb7696deebf8a1f8abc9") {

        // }

        let role = await Role.find().where({ group_id: sanitize(check_user.group_id) })


        // แสดงภาพรวมการติดตั้งนั่งร้าน โดยมี Icon สี แสดงจุดที่มีการติดตั้งนั่งร้าน
        let over_all_check = role.filter((el) => { return el.application_id == '62dd28ce8b1b54286bab741b' })

        // แสดงการแจ้งเตือนกรณีนั่งร้านที่ติดตั้งในพื้นที่หมดอายุการตรวจสภาพ โดยมี Icon สี เพื่อแจ้งเตือน
        let expire_check = role.filter((el) => { return el.application_id == '62dd29333eb3c4301b4af56d' })

        //การแจ้งเตือนกรณีนั่งร้านที่ติดตั้งในพื้นที่ใกล้หมดอายุการตรวจสภาพ, หมดอายุการตรวจสภาพ โดยมี Icon สี เพื่อแจ้งเตือนสถานะ
        let near_expire_check = role.filter((el) => { return el.application_id == '62dd29713eb3c4301b4af57b' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล โดยเมนู Search สามารถทำการเปิด-ปิด หน้าต่างการค้นหาได้ เพื่อเพิ่มพื้นที่การแสดงผลของ Dashboard
        let search_check = role.filter((el) => { return el.application_id == '62dd299c3eb3c4301b4af58c' })


        // แสดงการแจ้งเตือนยังไม่ได้ตรวจสอบ
        let no_check_check = role.filter((el) => { return el.application_id == '62fb3a4268c0cc7688e9f9e5' })


        let AreaName_master = await Location.find()
        let ScaffoldingType_master = await modelScaffoldingType.find()


        //delete row
        await Scaffolding.deleteMany({
            RemoveDate: { $lte: new Date().toISOString(), $ne: "" }
        })


        await Scaffolding.find({
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
                            filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaff })
                        }
                    }
                } else {
                    if (filter.PTTStaffCode.some(e => e.PTTStaffCode === element.PTTStaffCode) == false) {
                        filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaff })
                    }
                }

                if (filter.AreaName.some(e => e.AreaName === element.AreaName) == false) {
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

                let test = ''
                if (element.ScaffoldingSubType) {
                    test = test = element.ScaffoldingType + ' - ' + element.ScaffoldingSubType
                } else {
                    test = element.ScaffoldingType
                }

                if (filter.ScaffoldingType.some(e => e.ScaffoldingType === test) == false) {
                    filter.ScaffoldingType.push({ ScaffoldingType: test })
                }

                if (filter.VendorName.some(e => e.VendorName === element.VendorName) == false) {
                    filter.VendorName.push({ VendorName: element.VendorName })
                }


            }
        })

        if (expire_check.length > 0) {
            filter.notification.push({ notification: 'expire' })
        }

        if (near_expire_check.length > 0) {
            filter.notification.push({ notification: 'near_expire' })
        }

        if (no_check_check.length > 0) {
            filter.notification.push({ notification: 'no_check' })

        }


        let Notification_ = {}
        if (typeof Notification == 'string') {
            Notification = [Notification]
        }
        if (Notification.length > 0) {
            Notification_.$or = []
        }
        if (Notification.includes('expire')) {
            Notification_.$or.push({ WarningStatusID: '19' })
        }
        if (Notification.includes('near_expire')) {
            Notification_.$or.push({ WarningStatusID: '20' })
        }
        if (Notification.includes('no_check')) {
            Notification_.$or.push({ WarningStatusID: '22' })
        }

        await Scaffolding.find({
            $and: [
                where_permission,
                PTTStaffCode,
                AgencyName,
                WorkingStartDate,
                WorkingEndDate,
                AreaName,
                SubAreaName,
                ScaffoldingType,
                VendorName,
                Notification_
            ]
        }).then((result) => {
            for (let index = 0; index < result.length; index++) {

                let notification = {
                    expire: false,
                    near_expire: false,
                    no_check: false
                }

                const element = result[index]._doc;
                element.notification = {}

                //new
                if (element.WarningStatusID.toString() == '19') {
                    expire = expire + 1
                    element.others.StatusName = 'expire'
                    notification.expire = true

                }
                else if (element.WarningStatusID.toString() == '20') {
                    near_expire = near_expire + 1
                    element.others.StatusName = 'near_expire'
                    notification.near_expire = true

                }
                else if (element.WarningStatusID.toString() == '22') {
                    no_check = no_check + 1
                    element.others.StatusName = 'no_check'
                    notification.no_check = true

                }
                else {
                    if (Notification.length == 0) {
                        normal = normal + 1
                        element.others.StatusName = 'normal'
                    }

                }


                if (expire_check.length > 0) {
                    element.notification.expire = notification.expire
                }

                if (near_expire_check.length > 0) {
                    element.notification.near_expire = notification.near_expire
                }
                if (no_check_check.length > 0) {
                    element.notification.no_check = notification.no_check
                }



                delete element._id
                delete element.__v

                data_arr.push(element)
                all = all + 1



            }
        })
        let data = {}
        data.summary = {}
        data.filter = {}
        data.data = []


        if (over_all_check.length > 0) {

            data.summary = {
                all: all,
                normal: normal
            }
            if (expire_check.length > 0) {
                data.summary.expire = expire
            }

            if (near_expire_check.length > 0) {
                data.summary.near_expire = near_expire
            }

            if (no_check_check.length > 0) {
                data.summary.no_check = no_check
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
        data_ = sanitizeHtml(JSON.stringify(data_))
        res.send(JSON.parse(data_))

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}


export { all };
