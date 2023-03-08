
import _ from 'lodash'
import User from '../models/User/User.js';
import Equipment from '../models/Equipment/Equipment.js';
import EquipmentVehicle from '../models/EquipmentVehicle/EquipmentVehicle.js';
import config from '../utils/config.js';
import Role from '../models/Role/Role.js';
import Application from '../models/Application/Application.js';
import Location from '../models/Master/Location/Location.js';
import { permission } from '../preHandlers/permission.js';
import moment from "moment"
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {

    try {


        let application_id = config.menu_equipment_all_id
        await permission(application_id, req)

        await EquipmentVehicle.deleteMany({
            Remove_Obstruction: { $lte: new Date() }
        })

        await Equipment.deleteMany({
            DateTime_Out: { $lte: new Date() }
        })

        let where_permission = {}


        let check_user = await User.findOne().where({ _id: req._id })

        // //เจ้าของพื้นที่
        if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
            // ต้องไปเช็คใน loop เพราะมีหลาย owner
            // where_permission = { OwnerID: check_user.others.employeeid }
        }
        //ผู้ควบคุมงาน ปตท.
        else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission.PTTStaffCode = check_user.others.employeeid
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

        //แสดงภาพรวมอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้งอยู่ในพื้นที่ โดยมี Icon สี แสดงจุดที่มีการติดตั้งอุปกรณ์
        let over_all_check = role.filter((el) => { return el.application_id == '62e3ddf5efdbb1a4f36a241d' })

        // การแจ้งเตือนกรณีอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้งอยู่ในพื้นที่หมดอายุการตรวจสภาพโดยมี Icon สี เพื่อแจ้งเตือน
        let expire_check = role.filter((el) => { return el.application_id == '62e3de32efdbb1a4f36a242a' })

        // การแจ้งเตือนกรณีอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้ง อยู่ในพื้นที่ ใกล้หมดอายุการตรวจสภาพ, หมดอายุการตรวจสภาพ โดยมี Icon สี เพื่อแจ้งเตือนสถานะ
        let near_expire_check = role.filter((el) => { return el.application_id == '62e3de46efdbb1a4f36a2430' })

        //ภาพรวมการนำอุปกรณ์เข้า - ออก พื้นที่ โดยแสดงจำนวนอุปกรณ์เข้า - ออก
        let in_out_check = role.filter((el) => { return el.application_id == '62e3de5cefdbb1a4f36a2436' })

        //แสดงการแจ้งเตือนอุปกรณ์ที่ยังไม่ได้นำออกจากพื้นที่ โดยแจ้งเตือนตามรายการอุปกรณ์ที่มีการขออนุญาตนำเข้าพื้นที่ในแต่ละวัน
        let not_remove_check = role.filter((el) => { return el.application_id == '62e3de6aefdbb1a4f36a243c' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล โดยเมนู Search สามารถทำการเปิด-ปิด หน้าต่างการค้นหาได้ เพื่อเพิ่มพื้นที่การแสดงผลของ Dashboard
        let search_check = role.filter((el) => { return el.application_id == '62e3de79efdbb1a4f36a2442' })

        //การแจ้งเตือนและการแสดงผลรวมอุปกรณ์ติดตั้งกีดขวาง
        let obstruct_check = role.filter((el) => { return el.application_id == '62e3de88efdbb1a4f36a2448' })

        //แสดงผลรวมอุปกรณ์ทั้งหมด
        let all_check = role.filter((el) => { return el.application_id == '62e3dee6efdbb1a4f36a244e' })




        let data = await common(req, res, where_permission, check_user, over_all_check, expire_check, near_expire_check, in_out_check, not_remove_check, search_check, obstruct_check, all_check)

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (check_user.others.employeeid && check_user.group_id == "62a4cb17e0a99b4456aaf51e" && Object.keys(req.query).length === 0 && data.data.length == 0) {
            data_.MessageAlert = 'ไม่พบข้อมูลใบงานที่คุณเป็นผู้ควบคุมงาน กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        res.send(data_)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}


const risk = async (req, res) => {

    try {

        let application_id = config.menu_equipment_risk_id
        await permission(application_id, req)


        let where_permission = {}
        where_permission.risk_equipment = 1


        let check_user = await User.findOne().where({ _id: req._id })

        // //เจ้าของพื้นที่
        if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
            // ต้องไปเช็คใน loop เพราะมีหลาย owner
            // where_permission = { OwnerID: check_user.others.employeeid }
        }
        //ผู้ควบคุมงาน ปตท.
        else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission.PTTStaffCode = check_user.others.employeeid
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

        //แสดงภาพรวมอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้งอยู่ในพื้นที่ โดยมี Icon สี แสดงจุดที่มีการติดตั้งอุปกรณ์
        let over_all_check = role.filter((el) => { return el.application_id == '62e3dbfa36cd65e4612cd128' })

        // การแจ้งเตือนกรณีอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้งอยู่ในพื้นที่หมดอายุการตรวจสภาพโดยมี Icon สี เพื่อแจ้งเตือน
        let expire_check = role.filter((el) => { return el.application_id == '62d443fe2ee0fe85f35b714a' })

        // การแจ้งเตือนกรณีอุปกรณ์ที่มีความเสี่ยงซึ่งติดตั้ง อยู่ในพื้นที่ ใกล้หมดอายุการตรวจสภาพ, หมดอายุการตรวจสภาพ โดยมี Icon สี เพื่อแจ้งเตือนสถานะ
        let near_expire_check = role.filter((el) => { return el.application_id == '62d444452ee0fe85f35b7157' })

        //ภาพรวมการนำอุปกรณ์เข้า - ออก พื้นที่ โดยแสดงจำนวนอุปกรณ์เข้า - ออก
        let in_out_check = role.filter((el) => { return el.application_id == '62d444a82ee0fe85f35b7178' })

        //แสดงการแจ้งเตือนอุปกรณ์ที่ยังไม่ได้นำออกจากพื้นที่ โดยแจ้งเตือนตามรายการอุปกรณ์ที่มีการขออนุญาตนำเข้าพื้นที่ในแต่ละวัน
        let not_remove_check = role.filter((el) => { return el.application_id == '62d444c62ee0fe85f35b7183' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล โดยเมนู Search สามารถทำการเปิด-ปิด หน้าต่างการค้นหาได้ เพื่อเพิ่มพื้นที่การแสดงผลของ Dashboard
        let search_check = role.filter((el) => { return el.application_id == '62d445be2ee0fe85f35b71b0' })

        //การแจ้งเตือนและการแสดงผลรวมอุปกรณ์ติดตั้งกีดขวาง
        let obstruct_check = role.filter((el) => { return el.application_id == '62d7aa8fda04fb73f0191b60' })

        //แสดงผลรวมอุปกรณ์ทั้งหมด
        let all_check = role.filter((el) => { return el.application_id == '62d7ab81da04fb73f0191ba3' })



        let data = await common(req, res, where_permission, check_user, over_all_check, expire_check, near_expire_check, in_out_check, not_remove_check, search_check, obstruct_check, all_check)

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (check_user.others.employeeid && check_user.group_id == "62a4cb17e0a99b4456aaf51e" && Object.keys(req.query).length === 0 && data.data.length == 0) {
            data_.MessageAlert = 'ไม่พบข้อมูลใบงานที่คุณเป็นผู้ควบคุมงาน กรุณาทำการค้นหาข้อมูลที่ต้องการ'
        }
        res.send(data_)

    } catch (error) {
        error = sanitizeHtml(JSON.stringify({ Status: "failed", Message: error.toString() }))
        error = JSON.parse(error)
        return res.send(error)
    }
}

const common = async (req, res, where_permission, check_user, over_all_check, expire_check, near_expire_check, in_out_check, not_remove_check, search_check, obstruct_check, all_check) => {


    let filter = {
        AgencyName: [{ AgencyName: 'ทั้งหมด' }],
        PTTStaffCode: [{ PTTStaffCode: 'ทั้งหมด', PTTStaff: 'ทั้งหมด' }],
        AreaName: [{ AreaName: 'ทั้งหมด' }],
        EquipmentType: [{ EquipmentType: 'ทั้งหมด' }],
        CompanyName: [{ CompanyName: 'ทั้งหมด' }],
        notification: [{ notification: 'ทั้งหมด' }],
    }
    let data_arr = []
    let obstruct = 0
    let near_expire = 0
    let expire = 0
    let not_remove = 0
    let risk = 0
    let all = 0
    let In = 0
    let out = 0

    const today = moment().startOf('day')




    // let check_run_no = await Equipment.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
    // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0
    let EquipmentVehicle_master = await EquipmentVehicle.find({
        // $and: [
        //     // {
        //     //     'others.run_no': check_run_no
        //     // }
        // ]
    })

    let AreaName_master = await Location.find()

    let AgencyName = {}
    if (req.query.AgencyName && !req.query.AgencyName.toString().includes('ทั้งหมด')) {
        AgencyName = { AgencyName: sanitize(req.query.AgencyName) }

    }
    let PTTStaffCode = {}
    if (req.query.PTTStaffCode && !req.query.PTTStaffCode.toString().includes('ทั้งหมด')) {
        PTTStaffCode = { PTTStaffCode: sanitize(req.query.PTTStaffCode) }

    }

    let AreaName = {}
    if (req.query.AreaName && !req.query.AreaName.toString().includes('ทั้งหมด')) {
        AreaName = { AreaName: sanitize(req.query.AreaName) }

    }

    let EquipmentType = {}
    if (req.query.EquipmentType && !req.query.EquipmentType.toString().includes('ทั้งหมด')) {
        EquipmentType = { EquipmentType: sanitize(req.query.EquipmentType) }

    }

    let CompanyName = {}
    if (req.query.CompanyName && !req.query.CompanyName.toString().includes('ทั้งหมด')) {
        CompanyName = { CompanyName: sanitize(req.query.CompanyName) }

    }

    let Notification = []
    if (req.query.notification && !req.query.notification.toString().includes('ทั้งหมด')) {
        Notification = req.query.notification
    }


    await Equipment.find({
        // $and: [
        //     // {
        //     //     'others.run_no': check_run_no
        //     // },
        //     where_permission
        // ]
    }).then((result) => {
        for (let index = 0; index < result.length; index++) {
            const element = result[index];

            // if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
            //     if (element.OwnerCode_3) {
            //         if (check_user.others.employeeid != element.OwnerCode_3) {
            //             continue
            //         }
            //     } else if (element.OwnerCode_2) {
            //         if (check_user.others.employeeid != element.OwnerCode_2) {
            //             continue
            //         }
            //     } else {
            //         if (check_user.others.employeeid != element.OwnerCode_1) {
            //             continue
            //         }
            //     }
            // }

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


            if (filter.AreaName.some(e => e.AreaName === element.AreaName) == false) {
                filter.AreaName.push({
                    ...(AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]) ?
                        AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]._doc : {},
                    AreaName: element.AreaName
                })
            }


            if (filter.EquipmentType.some(e => e.EquipmentType === element.EquipmentType) == false) {
                filter.EquipmentType.push({ EquipmentType: element.EquipmentType })
            }

            if (filter.CompanyName.some(e => e.CompanyName === element.CompanyName) == false) {
                filter.CompanyName.push({ CompanyName: element.CompanyName })
            }

        }
    })


    if (expire_check.length > 0) {
        filter.notification.push({ notification: 'expire' })
        filter.notification.push({ notification: 'not_remove' })

    }

    if (near_expire_check.length > 0) {
        filter.notification.push({ notification: 'near_expire' })
    }

    // if (not_remove_check.length > 0) {
    //     filter.notification.push({ notification: 'not_remove' })

    // }

    if (obstruct_check.length > 0) {
        filter.notification.push({ notification: 'obstruct' })

    }


    let Notification_ = {}
    if (typeof Notification == 'string') {
        Notification = [Notification]
    }
    if (Notification.length > 0) {
        Notification_.$or = []
    }
    if (Notification.includes('expire')) {
        Notification_.$or.push({
            $or: [
                { Inspect_Status: 0, DateTime_In: { $lte: new Date(new Date().getTime() - (12 * 60 * 60 * 1000)) } },
                { Inspect_Status: 1, WarningStatus: 'หมดอายุ' }
            ]
        })
    }
    if (Notification.includes('near_expire')) {
        Notification_.$or.push({
            $or: [
                { Inspect_Status: 0, DateTime_In: { $lte: new Date(new Date().getTime() - (11 * 60 * 60 * 1000)), $gt: new Date(new Date().getTime() - (12 * 60 * 60 * 1000)) } },
                { Inspect_Status: 1, WarningStatus: 'ใกล้หมดอายุ' }
            ]
        })
    }
    if (Notification.includes('not_remove')) {
        Notification_.$or.push({
            $or: [
                { Inspect_Status: 0, DateTime_In: { $lte: new Date(new Date().getTime() - (12 * 60 * 60 * 1000)) } },
                { Inspect_Status: 1, WarningStatus: 'หมดอายุ' }
            ]
        })
    }

    if (Notification.includes('obstruct')) {
        Notification_.$or.push({})
    }


    // let test = await Equipment.aggregate([
    //     {
    //         "$lookup": {
    //             "from": "equipmentvehicles",
    //             "localField": "ObstructionID",
    //             "foreignField": "EquipmentID",
    //             "as": "appointments"
    //         }

    //     }])

    // ubBike.aggregate([
    //     { "$match": { "cust": req.query._id } },
    //     {
    //         "$lookup": {
    //             "from": "appos",
    //             "localField": "_id",
    //             "foreignField": "bike",
    //             "as": "appointments"
    //         }
    //     },
    //     { "$match": { "appointments.status": { "$ne": "Booked" } } }
    // ]).exec(function (err, bikes) {
    //     if (err) throw err;
    //     res.send(bikes);
    // });

    if (typeof req.query.notification == 'string') {
        req.query.notification = [req.query.notification]
    }

    await Equipment.find({
        $and: [
            where_permission,
            PTTStaffCode,
            AgencyName,
            AreaName,
            CompanyName,
            EquipmentType,
            Notification_
        ]
    }).sort('WorkPermitNo').then(async (result) => {


        for (let index = 0; index < result.length; index++) {
            let notification = {
                expire: false,
                not_remove: false,
                near_expire: false,
                obstruct: false
            }

            const element = result[index]._doc;
            element.notification = {}

            // if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
            //     if (element.OwnerCode_3) {
            //         if (check_user.others.employeeid != element.OwnerCode_3) {
            //             continue
            //         }
            //     } else if (element.OwnerCode_2) {
            //         if (check_user.others.employeeid != element.OwnerCode_2) {
            //             continue
            //         }
            //     } else {
            //         if (check_user.others.employeeid != element.OwnerCode_1) {
            //             continue
            //         }
            //     }
            // }


            element.others.show_in_map = true
            element.others.on_table = true

            if (element.OwnerCode_3) {
                element.others.OwnerCode = element.OwnerCode_3
                element.others.OwnerName = element.OwnerName_3
            } else if (element.OwnerCode_2) {
                element.others.OwnerCode = element.OwnerCode_2
                element.others.OwnerName = element.OwnerName_2
            } else {
                element.others.OwnerCode = element.OwnerCode_1
                element.others.OwnerName = element.OwnerName_1
            }

            let join_equipment_vehicle = await EquipmentVehicle_master.filter(el => { return el.ObstructionID == element.EquipmentID })
            if (join_equipment_vehicle.length > 0) {
                element.EquipmentVehicle = join_equipment_vehicle[0]
            } else {
                element.EquipmentVehicle = null
            }



            let continues = false
            if (req.query.notification && req.query.notification.includes('obstruct') && req.query.notification.length == 1) {
                continues = true
            }

            if (element.DateTime_Out) {
                // if ((element.DateTime_Out >= today.toDate() && element.DateTime_Out <= moment(today).endOf('day').toDate())) {
                if (element.DateTime_Out < new Date) {
                    out = out + 1
                    element.others.show_in_map = false
                    element.others.on_table = false
                    if (continues == true) {
                        continue
                    }
                } else {

                    if (element.EquipmentVehicle && element.EquipmentVehicle.ObstructionStatus == 2) {
                        obstruct = obstruct + 1
                        notification.obstruct = true
                    } else {
                        if (continues == true) {
                            continue
                        }
                    }
                    all = all + 1

                }
            } else {


                if (element.EquipmentVehicle && element.EquipmentVehicle.ObstructionStatus == 2) {
                    obstruct = obstruct + 1
                    notification.obstruct = true
                } else {
                    if (continues == true) {
                        continue
                    }
                }
                if (element.risk_equipment == 1) {
                    risk = risk + 1
                }
                all = all + 1
            }


            if (element.Inspect_Status == 0) {

                element.others.time_expire = moment(new Date(element.DateTime_In).getTime() + 12 * 60 * 60 * 1000).format('HH:mm');
                element.others.date_expire = (element.DateTime_In) ? new Date(new Date(element.DateTime_In).getTime() + 12 * 60 * 60 * 1000).toLocaleDateString() : null;


                if (element.DateTime_In <= new Date(new Date().getTime() - (11 * 60 * 60 * 1000)) && element.DateTime_In > new Date(new Date().getTime() - (12 * 60 * 60 * 1000))) {
                    // 11 housrs
                    near_expire = near_expire + 1
                    notification.near_expire = true
                }
                else if (element.DateTime_In <= new Date(new Date().getTime() - (12 * 60 * 60 * 1000))) {
                    expire = expire + 1
                    notification.expire = true
                    not_remove = not_remove + 1
                    notification.not_remove = true
                }

            } else if (element.Inspect_Status == 1) {

                element.others.time_expire = null
                element.others.date_expire = (element.ExpiredDate) ? new Date(element.ExpiredDate).toLocaleDateString() : null


                // let join_equipment_vehicle = await EquipmentVehicle_master.filter(el => { return el.ObstructionID == element.EquipmentID })
                // if (join_equipment_vehicle.length > 0) {
                //     element.EquipmentVehicle = join_equipment_vehicle[0]
                // } else {
                //     element.EquipmentVehicle = null
                // }

                if (element.WarningStatus == 'ใกล้หมดอายุ') {
                    near_expire = near_expire + 1
                    notification.near_expire = true
                } else if (element.WarningStatus == 'หมดอายุ') {
                    expire = expire + 1
                    notification.expire = true

                    not_remove = not_remove + 1
                    notification.not_remove = true

                }
            }



            if ((element.DateTime_In >= today.toDate() && element.DateTime_In <= moment(today).endOf('day').toDate())) {
                In = In + 1
            }

            // if (new Date(element.DateTime_In).getDate() == new Date().getDate()) {
            //     console.log(new Date(element.DateTime_In).getDate())
            //     In = In + 1
            // }



            if (expire_check.length > 0) {
                element.notification.expire = notification.expire
                element.notification.not_remove = notification.not_remove
            }
            if (near_expire_check.length > 0) {
                element.notification.near_expire = notification.near_expire
            }
            if (obstruct_check.length > 0) {
                element.notification.obstruct = notification.obstruct
            }

            // if (not_remove_check.length > 0) {
            //     element.notification.not_remove = notification.not_remove
            // }

            data_arr.push(element)
        }
    })




    let data = {}

    data.summary = {}
    data.filter = {}
    data.data = []
    if (over_all_check.length > 0) {

        data.summary = {
            risk: risk
        }

        if (expire_check.length > 0) {
            data.summary.expire = expire
            data.summary.not_remove = not_remove
        }
        if (near_expire_check.length > 0) {
            data.summary.near_expire = near_expire
        }
        if (in_out_check.length > 0) {
            data.summary.in = In
            data.summary.out = out
        }
        // if (not_remove_check.length > 0) {
        //     data.summary.not_remove = not_remove
        // }
        if (obstruct_check.length > 0) {
            data.summary.obstruct = obstruct
        }

        if (all_check.length > 0) {
            data.summary.all = all
        }

        data.data = data_arr
    }
    if (search_check.length > 0) {
        data.filter = filter
    }

    return data
}

export { all, risk };
