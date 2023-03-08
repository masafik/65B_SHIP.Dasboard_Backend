
import AccessControl from "../models/AccessControl/AccessControl.js";
import User from '../models/User/User.js';
import AccessControlDevice from '../models/AccessControlDevice/AccessControlDevice.js';
import { permission } from '../preHandlers/permission.js';
import moment from 'moment'
import Role from '../models/Role/Role.js';
import Location from "../models/Master/Location/Location.js";
import AccessControlExchangeCard from "../models/AccessControlExchangeCard/AccessControlExchangeCard.js";
import sanitizeHtml from "sanitize-html";
import sanitize from 'mongo-sanitize';

const all = async (req, res) => {
    try {

        let application_id = '62a4d4fa22bdf92ba30d163b'
        await permission(application_id, req)


        let filter = {
            AgencyName: [{ AgencyName: 'ทั้งหมด' }],
            PTTStaffCode: [{ PTTStaffCode: 'ทั้งหมด', PTTStaff: 'ทั้งหมด' }],
            AccDeviceName: [{ AccDeviceName: 'ทั้งหมด' }],
            AreaName: [{ AreaName: 'ทั้งหมด' }],
            SubAreaName: [{ SubAreaName: 'ทั้งหมด' }],
            PersonalTypeName: [{ PersonalTypeName: 'ทั้งหมด' }],
            CompanyName: [{ CompanyName: 'ทั้งหมด' }],
            notification: [{ notification: 'ทั้งหมด' }],
        }
        let where_permission = {}
        let data = {}
        let all = 0
        let In = 0
        let Out = 0
        let exchange_card_in = 0
        let exchange_card_out = 0
        let on_plant = 0
        let online = 0
        let offline = 0
        let data_arr = []


        // let check_run_no = await AccessControlDevice.findOne().sort({ 'others.run_no': -1 }).select('others.run_no')
        // check_run_no = _.isObject(check_run_no) ? check_run_no.others.run_no : 0
        let AccDeviceName_master = await AccessControlDevice.find({
            // $and: [
            //     {
            //         'others.run_no': check_run_no
            //     }
            // ]
        })
        let AreaName_master = await Location.find()


        let CardType_master = [
            { CardTypeID: '1', CardTypeName: 'ผู้มาติดต่อ' },
            { CardTypeID: '2', CardTypeName: 'ผู้เยี่ยมชม' },
            { CardTypeID: '3', CardTypeName: 'ผู้รับเหมาชั่วคราว' },
            { CardTypeID: '4', CardTypeName: 'ผู้รับเหมาประจำ' },
            { CardTypeID: '5', CardTypeName: 'นักศึกษาฝึกงาน' },
            { CardTypeID: '6', CardTypeName: 'พนักงานสรรพสามิต/ราชการ/ลูกค้า' },
            { CardTypeID: '7', CardTypeName: 'พนักงาน ปตท. โครงการ' }
        ]

        let PersonalType_master = [
            { PersonalTypeID: '0', PersonalTypeName: 'พนักงาน ปตท. (สังกัด ผยก.)' },
            { PersonalTypeID: '1', PersonalTypeName: 'พนักงานสรรพสามิต/ราชการ/ลูกค้า' },
            { PersonalTypeID: '2', PersonalTypeName: 'ทดสอบผู้มาติดต่อ' },
            { PersonalTypeID: '3', PersonalTypeName: 'ผู้รับเหมาประจำ' },
            { PersonalTypeID: '5', PersonalTypeName: 'ผู้เยี่ยมชม' },
            { PersonalTypeID: '6', PersonalTypeName: 'ผู้รับเหมาชั่วคราว' },
            { PersonalTypeID: '7', PersonalTypeName: 'นักศึกษาฝึกงาน' },
            { PersonalTypeID: '8', PersonalTypeName: 'ผู้มาติดต่อ' }
        ]


        let AgencyName = {}
        if (req.query.AgencyName && !req.query.AgencyName.toString().includes('ทั้งหมด')) {
            AgencyName = { AgencyName: { $in: sanitize(req.query.AgencyName) } }
        }

        let PTTStaffCode = {}
        if (req.query.PTTStaffCode && !req.query.PTTStaffCode.toString().includes('ทั้งหมด')) {
            PTTStaffCode = { PTTStaffCode: { $in: sanitize(req.query.PTTStaffCode) } }
        }

        let AreaName = {}
        if (req.query.AreaName && !req.query.AreaName.toString().includes('ทั้งหมด')) {
            AreaName = { AreaName: { $in: sanitize(req.query.AreaName) } }
        }

        let SubAreaName = {}
        if (req.query.SubAreaName && !req.query.SubAreaName.toString().includes('ทั้งหมด')) {
            SubAreaName = { SubAreaName: { $in: sanitize(req.query.SubAreaName) } }
        }


        let Scan_Date_Time_Start = {}
        if (req.query.Scan_Date_Time_Start) {
            Scan_Date_Time_Start = { 'others.scan_date_time': { $gte: sanitize(req.query.Scan_Date_Time_Start) } }
        }


        let Scan_Date_Time_End = {}
        if (req.query.Scan_Date_Time_End) {
            Scan_Date_Time_End = { 'others.scan_date_time': { $lte: sanitize(req.query.Scan_Date_Time_End) } }
        }

        let AccDeviceName = {}
        if (req.query.AccDeviceName && !req.query.AccDeviceName.toString().includes('ทั้งหมด')) {
            AccDeviceName = { ACC_ID: sanitize(req.query.AccDeviceName) }

        }

        let PersonalTypeName = {}
        if (req.query.PersonalTypeName && !req.query.PersonalTypeName.toString().includes('ทั้งหมด')) {
            PersonalTypeName = { PersonalTypeID: { $in: sanitize(req.query.PersonalTypeName) } }

        }

        let CompanyName = {}
        if (req.query.CompanyName && !req.query.CompanyName.toString().includes('ทั้งหมด')) {
            CompanyName = { CompanyName: { $in: sanitize(req.query.CompanyName) } }
        }

        let Notification = []
        if (req.query.notification && !req.query.notification.toString().includes('ทั้งหมด')) {
            Notification = req.query.notification
        }


        let check_user = await User.findOne().where({ _id: sanitize(req._id) })


        //เจ้าของพื้นที่
        // if (check_user.group_id == "62a4cad5e0a99b4456aaf514") {

        // }
        //ผู้ควบคุมงาน ปตท.
        if (check_user.group_id == "62a4cb17e0a99b4456aaf51e") {
            if (Object.keys(req.query).length === 0) {
                where_permission = { PTTStaffCode: check_user.others.employeeid }
            }
        }
        //เจ้าหน้าที่รักษาความปลอดภัย
        // else if (check_user.group_id == "62a4cb26e0a99b4456aaf522") {

        // }
        // //หน่วยงาน ปภ.ผยก.
        // else if (check_user.group_id == "62a4cb5896deebf8a1f8abbe") {
        // }

        // //ผู้ดูแลระบบ
        // else if (check_user.group_id == "62a4cb7696deebf8a1f8abc9") {

        // }


        let role = await Role.find().where({ group_id: sanitize(check_user.group_id) })




        // แสดงภาพรวมบุคคลที่เข้า - ออก พื้นที่ โดย มี Icon แสดงแยกตามประเภทกลุ่มบุคคล และแสดงจำนวนบุคคลเข้า-ออก (ใช้ข้อมูลจากพื้นที่ที่สแกนอุปกรณ์ล่าสุด)
        let over_all_check = role.filter((el) => { return el.application_id == '630cfaef11450344aa59db85' })

        // การสแกนบัตรเข้า - ออก
        let In_Out_check = role.filter((el) => { return el.application_id == '630cfb0611450344aa59db91' })

        //การแลกบัตรเข้า - ออก
        let exchange_card_in_out_check = role.filter((el) => { return el.application_id == '630cfb1811450344aa59db97' })

        //บุคคลที่อยู่ในพื้นที่
        let on_plant_check = role.filter((el) => { return el.application_id == '630cfb2b11450344aa59db9d' })

        //อุปกรณ์ online offline
        let online_offline_check = role.filter((el) => { return el.application_id == '630cfb4a11450344aa59dba3' })

        //ใช้ฟังก์ชันการค้นหาข้อมูล โดยเมนู Search สามารถทำการเปิด-ปิด หน้าต่างการค้นหาได้ เพื่อเพิ่มพื้นที่การแสดงผลของ Dashboard
        let search_check = role.filter((el) => { return el.application_id == '630cfb6011450344aa59dba9' })

        await AccessControl.find({
            // $and: [
            //     where_permission
            // ]
        }).then((result) => {
            for (var element of result) {
                if (!element) {
                    break;
                } else {
                    element = element._doc;

                    if (filter.AgencyName.some(e => e.AgencyName === element.AgencyName) == 0) {
                        filter.AgencyName.push({ AgencyName: element.AgencyName })
                    }
                    if (req.query.AgencyName) {
                        if (req.query.AgencyName.toString().includes(element.AgencyName) || req.query.AgencyName.toString().includes('ทั้งหมด')) {
                            if (filter.PTTStaffCode.some(e => e.PTTStaffCode === element.PTTStaffCode) == 0) {
                                filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffFirstName + ' ' + element.PTTStaffLastName })
                            }
                        }
                    } else {
                        if (filter.PTTStaffCode.some(e => e.PTTStaffCode === element.PTTStaffCode) == 0) {
                            filter.PTTStaffCode.push({ PTTStaffCode: element.PTTStaffCode, PTTStaff: element.PTTStaffFirstName + ' ' + element.PTTStaffLastName })
                        }
                    }

                    let join_access_control_device = AccDeviceName_master.filter(el => { return el.AccDeviceID == element.ACC_ID })

                    if (join_access_control_device.length > 0) {
                        element.AccDevice = join_access_control_device[0]
                    } else {
                        element.AccDevice = null
                    }

                    if (element.ACC_ID && element.AccDevice) {

                        element.AreaName = element.AccDevice.AreaName
                        element.SubAreaName = element.AccDevice.SubAreaName

                        if (filter.AreaName.some(e => e.AreaName === element.AreaName) == 0) {
                            filter.AreaName.push({
                                ...(AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]) ?
                                    AreaName_master.filter(el => { return el.Location_Name == element.AreaName })[0]._doc : {},
                                AreaName: element.AreaName
                            })
                        }
                    }


                    if (req.query.AreaName) {
                        if (req.query.AreaName.toString().includes(element.AreaName) || req.query.AreaName.toString().includes('ทั้งหมด')) {
                            if (filter.SubAreaName.some(e => e.SubAreaName === element.SubAreaName) == 0) {
                                filter.SubAreaName.push({
                                    SubAreaName: element.SubAreaName
                                })
                            }
                        }
                    } else {
                        if (filter.SubAreaName.some(e => e.SubAreaName === element.SubAreaName) == 0) {
                            filter.SubAreaName.push({
                                SubAreaName: element.SubAreaName
                            })
                        }
                    }



                    if (filter.PersonalTypeName.some(e => e.PersonalTypeID === element.PersonalTypeID) == 0) {
                        let check_in_master = PersonalType_master.filter(el => { return el.PersonalTypeID == element.PersonalTypeID })
                        filter.PersonalTypeName.push({
                            ...(check_in_master[0]) ? check_in_master[0] : {}, PersonalTypeID: element.PersonalTypeID
                        })
                    }


                    if (filter.CompanyName.some(e => e.CompanyName === element.CompanyName) == 0) {
                        filter.CompanyName.push({ CompanyName: element.CompanyName })
                    }
                }



            }
        })

        filter.AccDeviceName = filter.AccDeviceName.concat(AccDeviceName_master)

        let exchange = await AccessControlExchangeCard.findOne()
        if (exchange) {
            exchange_card_in = parseInt(exchange.ExchangeCardIn)
            exchange_card_out = parseInt(exchange.ExchangeCardOut)
        }



        await AccessControl.find({
            $and: [
                where_permission,
                PTTStaffCode,
                AgencyName,
                Scan_Date_Time_Start,
                Scan_Date_Time_End,
                AccDeviceName,
                CompanyName,
                PersonalTypeName
            ]
        }).then((result) => {
            for (var element of result) {
                if (!element) {
                    break;
                } else {
                    element = element._doc;
                    element.notification = {}

                    let join_access_control_device = AccDeviceName_master.filter(el => { return el.AccDeviceID == element.ACC_ID })

                    if (join_access_control_device.length > 0) {
                        element.AccDevice = join_access_control_device[0]
                    } else {
                        element.AccDevice = null
                    }

                    let join_personal_type = PersonalType_master.filter(el => { return el.PersonalTypeID == element.PersonalTypeID })
                    element.PersonalTypeName = (join_personal_type.length > 0) ? join_personal_type[0] : null

                    if (element.ACC_ID && element.AccDevice) {
                        element.AreaName = element.AccDevice.AreaName
                        element.SubAreaName = element.AccDevice.SubAreaName

                    }


                    if (req.query.AreaName && !req.query.AreaName.includes(element.AreaName)) {
                        continue
                    }
                    if (req.query.SubAreaName && !req.query.SubAreaName.includes(element.SubAreaName)) {
                        continue
                    }


                    let CardTypeName = CardType_master.filter(el => { return el.CardTypeID == element.CardTypeID })
                    element.others.CardTypeName = (CardTypeName.length > 0) ? CardTypeName[0].CardTypeName : null


                    let PersonalTypeName = PersonalType_master.filter(el => { return el.PersonalTypeID == element.PersonalTypeID })

                    if (PersonalTypeName.length > 0) {
                        element.others.PersonalTypeName = PersonalTypeName[0].PersonalTypeName
                    } else {
                        element.others.PersonalTypeName = null
                    }

                    const today = moment().startOf('day')

                    if (element.ScanStatus == '0') {
                        element.others.ScanStatus_Name = 'ยังไม่ผ่านการสแกน'
                    }
                    else if (element.ScanStatus == '1') {
                        if (element.others.ScanDateTime1 >= today.toDate() && element.others.ScanDateTime1 <= moment(today).endOf('day').toDate()) {
                            In = In + 1
                        }
                        element.others.ScanStatus_Name = 'สแกนเข้า'
                    }
                    else if (element.ScanStatus == '2') {
                        if (element.others.ScanDateTime2 >= today.toDate() && element.others.ScanDateTime2 <= moment(today).endOf('day').toDate()) {
                            Out = Out + 1
                        }
                        element.others.ScanStatus_Name = 'สแกนออก'
                    }

                    if (element.OnPlant == true && element.AccDevice && element.AccDevice.AreaID != 0) {
                        on_plant = on_plant + 1
                        element.others.show_in_map = true
                        element.others.on_plant = true
                    } else {
                        element.others.show_in_map = false
                        element.others.on_plant = false
                    }

                    if (element.ExchangeCardStatus == '1') {
                        if (element.others.ExchangeCardDateTime1 >= today.toDate() && element.others.ExchangeCardDateTime1 <= moment(today).endOf('day').toDate()) {
                        }
                        element.others.ExchangeCard_Status_Name = 'แลกบัตรเข้า'
                    }
                    else if (element.ExchangeCardStatus == '2') {
                        if (element.others.ExchangeCardDateTime2 >= today.toDate() && element.others.ExchangeCardDateTime2 <= moment(today).endOf('day').toDate()) {
                        }
                        element.others.ExchangeCard_Status_Name = 'แลกบัตรออก'
                    }
                    else if (element.ExchangeCardStatus == '3') {
                        element.others.ExchangeCard_Status_Name = 'De-Activate'
                    }
                    else if (element.ExchangeCardStatus == '4') {
                        element.others.ExchangeCard_Status_Name = 'Activate'
                    }


                    element.others.on_table = true

                    all = all + 1
                    data_arr.push(element)


                }

            }
        })


        let data_length = data_arr.length


        AccDeviceName = (req) ? req.query.AccDeviceName : undefined
        AccDeviceName = (AccDeviceName) ? { AccDeviceName: AccDeviceName } : {}

        if (online_offline_check.length > 0) {
            filter.notification.push({ notification: 'offline' })
        }

        let Notification_ = {}
        if (typeof Notification == 'string') {
            Notification = [Notification]
        }
        if (Notification.length > 0) {
            Notification_.$or = []
        }
        if (Notification.includes('offline')) {
            Notification_.$or.push({ AccDeviceStatus: '0' })
        }


        let data_device = await AccessControlDevice.find({
            $and: [
                AreaName,
                SubAreaName,
                AccDeviceName,
                Notification_
            ]
        })


        for (var element of data_device) {
            if (!element) {
                break;
            } else {
                element = element._doc;
                element.notification = {}

                element.others.show_in_map = true
                element.others.on_table = false


                let notification = {
                    offline: false
                }

                if (element.AccDeviceStatus == '0') {
                    offline = offline + 1
                    notification.offline = true
                    element.others.AccDeviceStatus = 'offline'

                } else if (element.AccDeviceStatus == '1') {
                    online = online + 1
                    element.others.AccDeviceStatus = 'online'
                }

                if (online_offline_check.length > 0) {
                    element.notification.offline = notification.offline

                }

                data_arr.push(element)
            }


        }


        data = {}
        data.summary = {}
        data.filter = {}
        data.data = []

        if (over_all_check.length > 0) {

            data.summary = {
                all: all,
            }
            if (In_Out_check.length > 0) {
                data.summary.in = In
                data.summary.out = Out
            }

            if (exchange_card_in_out_check.length > 0) {
                data.summary.exchange_card_in = exchange_card_in
                data.summary.exchange_card_out = exchange_card_out
            }

            if (on_plant_check.length > 0) {
                data.summary.on_plant = on_plant
            }
            if (online_offline_check.length > 0) {
                data.summary.offline = offline
                data.summary.online = online
            }
            data.summary.main_plant = exchange_card_in - In

            data.data = data_arr
        }

        if (search_check.length > 0) {
            data.filter = filter
        }

        let data_ = {
            Status: 'success',
            Message: data
        }
        if (check_user.others.employeeid && check_user.group_id == "62a4cb17e0a99b4456aaf51e" && Object.keys(req.query).length === 0 && data_length == 0) {
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
