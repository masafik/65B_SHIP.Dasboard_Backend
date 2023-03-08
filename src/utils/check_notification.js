import schedule from 'node-schedule'
import Equipment from '../models/Equipment/Equipment.js'
import EquipmentVehicle from '../models/EquipmentVehicle/EquipmentVehicle.js'
import People from '../models/People/People.js'
import Scaffolding from '../models/Scaffolding/Scaffolding.js'
import WorkPermit from '../models/WorkPermit/WorkPermit.js'
import Vehicle from '../models/Vehicle/Vehicle.js'
import Role from '../models/Role/Role.js'
import { ObjectId } from 'mongodb';
import User from '../models/User/User.js'
import AccessControlDevice from '../models/AccessControlDevice/AccessControlDevice.js'
import _ from 'lodash'

const check_notification_loop = async () => {
    await check_notification([])
    // setInterval(async () => {
    //     await check_notification([])
    // }, 10000)

}

const check_notification = async (check_user) => {

    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    var gas_check_hour = 1
    var now = new Date
    var notification = {
        '/accesscontrol': false,
        '/workpermit': false,
        '/equipment': false,
        '/peopletracking': false,
        '/scaffolding': false,
        '/vehicle': false
    }
    var day_7 = new Date().setDate(new Date().getDate() + 7);
    //เจ้าของพื้นที่
    if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {
        gas_check_hour = 3

    }
    //ผู้ควบคุมงาน ปตท.
    else if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
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


    var role = await Role.find().where({ group_id: check_user.group_id })

    //access
    var online_offline_check = role.filter((el) => { return el.application_id == '630cfb4a11450344aa59dba3' })

    //worlpermit  
    var impairment_chek = role.filter((el) => { return el.application_id == '62ac7c1d2704eb8aa472f123' })
    var gas_check = role.filter((el) => { return el.application_id == '62ac7cfa08889e4f8e123218' })
    var near_expire_check_w = role.filter((el) => { return el.application_id == '62ac7d3608889e4f8e123225' })

    //equipment
    var expire_check_e = role.filter((el) => { return el.application_id == '62d443fe2ee0fe85f35b714a' })
    var near_expire_check_e = role.filter((el) => { return el.application_id == '62d444452ee0fe85f35b7157' })
    var not_remove_check = role.filter((el) => { return el.application_id == '62d444c62ee0fe85f35b7183' })
    var obstruct_check = role.filter((el) => { return el.application_id == '62d7aa8fda04fb73f0191b60' })


    //peopletracking 
    var still_or_out_check = role.filter((el) => { return el.application_id == '630cf62cd911b53955bbc091' })
    var sos_check = role.filter((el) => { return el.application_id == '630cf671d911b53955bbc097' })
    var no_work_check = role.filter((el) => { return el.application_id == '630cf6b0d911b53955bbc09d' })

    //scaff
    var expire_check_s = role.filter((el) => { return el.application_id == '62dd29333eb3c4301b4af56d' })
    var near_expire_check_s = role.filter((el) => { return el.application_id == '62dd29713eb3c4301b4af57b' })
    var no_check_check = role.filter((el) => { return el.application_id == '62fb3a4268c0cc7688e9f9e5' })

    //vehicle
    var drive_out_control_area_check = role.filter((el) => { return el.application_id == '63050ce6d8a5e16460b2d712' })
    var enter_forbidden_area_check = role.filter((el) => { return el.application_id == '63050cfcd8a5e16460b2d718' })
    var park_undefine_spot_check = role.filter((el) => { return el.application_id == '63050d0dd8a5e16460b2d71e' })
    var over_speed_check = role.filter((el) => { return el.application_id == '63050d33d8a5e16460b2d724' })

    //accescotrol
    if (online_offline_check.length > 0 || role.length == 0) {
        // var check_run_no = await AccessControlDevice.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
        // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0
        var data_device = await AccessControlDevice.find({
            // $and: [
            //     {
            //         'others.run_no': check_run_no
            //     }]
        }).then((result) => {

            for (let index = 0; index < result.length; index++) {
                const element = result[index]._doc;
                if (element.AccDeviceStatus == '0') {
                    notification["/accesscontrol"] = true
                }
            }

        })
    }

    //workpermit
    if (near_expire_check_w.length > 0 || gas_check.length > 0 || impairment_chek.length > 0 || role.length == 0) {
        await WorkPermit.find({
        }).then(async (result) => {
            for (let index = 0; index < result.length; index++) {
                const element = result[index]._doc;

                var workingEnd = new Date(element.others.workingEnd)

                if (element.workingEnd && workingEnd - new Date() < ONE_HOUR && workingEnd >= new Date()) {
                    notification["/workpermit"] = true
                }

                if (element.workingEnd && workingEnd < new Date()) {
                    notification["/workpermit"] = true
                }

                var gasMeasurement = new Date(element.others.gasMeasurementDate)
                if (new Date() - gasMeasurement >= (gas_check_hour * ONE_HOUR)) {
                    notification["/workpermit"] = true
                }

                if (element.impairmentName.length > 0) {
                    notification["/workpermit"] = true
                }

            }

        })

    }


    //equipemt
    if (expire_check_e.length > 0 || near_expire_check_e.length > 0 || obstruct_check.length > 0 || not_remove_check.length > 0 || role.length == 0) {
        // var check_run_no = await Equipment.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
        // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0
        var EquipmentVehicle_master = await EquipmentVehicle.find({
            // $and: [
            //     {
            //         'others.run_no': check_run_no
            //     }
            // ]
        })

        // var check_run_no = await Equipment.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
        // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0
        await Equipment.find({
            // $and: [
            //     {
            //         'others.run_no': check_run_no
            //     }
            // ]
        }).sort('WorkPermitNo').then((result) => {

            for (let index = 0; index < result.length; index++) {

                const element = result[index]._doc;

                if (element.Inspect_Status == 0) {
                    if (new Date() - element.DateTime_In >= 11 * 60 * 60 * 1000 && new Date() - element.DateTime_In < 12 * 60 * 60 * 1000) {
                        notification["/equipment"] = true

                    } else if (new Date() - element.DateTime_In >= 12 * 60 * 60 * 1000) {
                        notification["/equipment"] = true

                    }

                } else if (element.Inspect_Status == 1) {

                    if (element.WarningStatus == 'ใกล้หมดอายุ') {
                        notification["/equipment"] = true

                    } else if (element.WarningStatus == 'หมดอายุ') {
                        notification["/equipment"] = true

                    }
                }

                var join_equipment_vehicle = EquipmentVehicle_master.filter(el => { return el.ObstructionID == element.EquipmentID })
                if (join_equipment_vehicle.length > 0) {
                    element.EquipmentVehicle = join_equipment_vehicle[0]
                } else {
                    element.EquipmentVehicle = null
                }
                if (element.EquipmentVehicle && element.EquipmentVehicle.ObstructionStatus == 2) {
                    notification["/equipment"] = true
                }

            }
        })

    }


    //peopletracking
    if (still_or_out_check.length > 0 || sos_check.length > 0 || no_work_check.length > 0 || role.length == 0) {
        await People.find({}).then((result) => {
            for (let index = 0; index < result.length; index++) {
                const element = result[index]._doc;

                if (element.WarningStatusID) {
                    if (element.WarningStatusID.includes(1)) {
                        notification["/peopletracking"] = true
                    }
                    if (element.WarningStatusID.includes(2)) {
                        notification["/peopletracking"] = true

                    }
                    if (element.WarningStatusID.includes(3)) {
                        notification["/peopletracking"] = true

                    }
                }
            }
        })
    }


    //scaff
    if (expire_check_s.length > 0 || near_expire_check_s.length > 0 || no_check_check.length > 0 || role.length == 0) {

        await Scaffolding.find({}).then((result) => {
            for (let index = 0; index < result.length; index++) {
                const element = result[index]._doc;

                if (element.WarningStatusID.toString() == '19') {
                    notification["/scaffolding"] = true
                }
                else if (element.WarningStatusID.toString() == '20') {
                    notification["/scaffolding"] = true
                }
                else if (element.WarningStatusID.toString() == '22') {
                    notification["/scaffolding"] = true
                }

            }
        })
    }

    //vehicle

    if (drive_out_control_area_check.length > 0 || park_undefine_spot_check.length > 0 || over_speed_check.length > 0 || enter_forbidden_area_check.length > 0 || role.length == 0) {
        await Vehicle.find({}).then((result) => {
            for (let index = 0; index < result.length; index++) {

                const element = result[index]._doc;

                if (element.WarningStatusId) {
                    if (element.WarningStatusId.includes('s01')) {
                        notification["/vehicle"] = true
                    }
                    if (element.WarningStatusId.includes('s02')) {
                        notification["/vehicle"] = true
                    }
                    if (element.WarningStatusId.includes('s03') || element.WarningStatusId.includes('s04')) {
                        notification["/vehicle"] = true
                    }
                    if (element.WarningStatusId.includes('s05')) {
                        notification["/vehicle"] = true
                    }
                }

            }
        })
    }


    console.log(notification)
    return notification


}

export { check_notification, check_notification_loop }