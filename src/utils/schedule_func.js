import schedule from 'node-schedule'
import Equipment from '../models/Equipment/Equipment.js'
import Group from '../models/Group/Group.js'
import AccessControl from '../models/AccessControl/AccessControl.js'
import WorkPermit from '../models/WorkPermit/WorkPermit.js'
import WorkpermitStatus from '../models/Master/WorkpermitStatus/WorkpermitStatus.js'
import Vehicle6 from '../models/Vehicle6/Vehicle6.js'
import { ObjectId } from 'mongodb';
import EquipmentVehicle from '../models/EquipmentVehicle/EquipmentVehicle.js'
import axios from 'axios'
import { createRequire } from "module";
import config from './config.js'
const require = createRequire(import.meta.url);
const amqp = require('amqplib');
import { workPermit, accessControl, accessControlDevice } from '../handlers/webhook.js'
import Scaffolding from '../models/Scaffolding/Scaffolding.js'
import AccessControlDevice from '../models/AccessControlDevice/AccessControlDevice.js'
import User from '../models/User/User.js'
const URL = require("url").URL

const check_row_expire = async () => {


    const job = schedule.scheduleJob('0 0 0 * * *', async function () {

        // equipment
        // let equipment_exp = await Equipment.find({
        //     DateTime_Out: { $lte: new Date() }
        // })

        // let equipment_vehicle_exp = await EquipmentVehicle.find({
        //     Remove_Obstruction: { $lte: new Date() },
        //     ObstructionID: { $in: equipment_exp.map(el => { return el.EquipmentID }) }
        // })

        // let to_delete = equipment_vehicle_exp.map(el => {
        //     return el.ObstructionID
        // })

        // await EquipmentVehicle.deleteMany({
        //     ObstructionID: { $in: to_delete }
        // })

        // await Equipment.deleteMany({
        //     EquipmentID: { $in: to_delete }
        // })

        await EquipmentVehicle.deleteMany({
            Remove_Obstruction: { $lte: new Date() }
        })

        await Equipment.deleteMany({
            DateTime_Out: { $lte: new Date() }
        })


        //accesscontrol
        await AccessControl.deleteMany({
            ExchangeCardStatus: { $in: [2, 3, 4] }
        })


        //workpermit

        let chek_status = await WorkpermitStatus.find()


        await WorkPermit.find({
        }).then(async (result) => {
            for (let index = 0; index < result.length; index++) {

                const element = result[index]._doc;

                let check = chek_status.filter(function (el) {
                    return el.Status_ID == element.WorksheetStatusId
                });

                if (check.length > 0 && check[0].IsOpen == true) {

                } else {

                    await WorkPermit.deleteOne({
                        _id: element._id
                    })

                }

            }

        })

        //Vehicle6
        // await Vehicle6.deleteMany({
        //     DateTime_Out: { $lte: new Date(), $ne: "" }
        // })

        compare_user()

    })
}

const get_workpermit_from_acc = async () => {
    const job = schedule.scheduleJob('0 05 02 * * *', async function () {

        try {
            //get token 
            let api = new URL(config.acc_api + '/ship-api/auth/token')
            let token = await axios.post(api.href,
                { "api_key": config.acc_api_key }
            )

            api = new URL(config.acc_api + '/ship-api/wpm/permit-worker')
            let test = await axios.get(api.href,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token.data.access_token
                    }
                }
            )
            await WorkPermit.deleteMany()
            let data = {}
            data.body = test.data
            await workPermit(data).then(res => { console.log(res) }).catch(err => { console.log(err) })
        } catch (error) {

        }

    })
}


const get_acc_from_acc = async () => {
    const job = schedule.scheduleJob('0 0 0 * * *', async function () {

        try {
            //get token 
            let api = new URL(config.acc_api + '/ship-api/auth/token')
            let token = await axios.post(api.href,
                { "api_key": config.acc_api_key }
            )

            api = new URL(config.acc_api + '/ship-api/cmd/scan-in-out')
            let test = await axios.get(api.href,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token.data.access_token
                    }
                }
            )
            await AccessControl.deleteMany()
            let data = {}
            data.body = test.data
            // console.log(data)
            await accessControl(data).then(res => { console.log(res) }).catch(err => { console.log(err) })

        } catch (error) {

        }

    })
}

const get_acc_device_from_acc = async () => {
    const job = schedule.scheduleJob('0 0 0 * * *', async function () {

        try {
            //get token 
            let api = new URL(config.acc_api + '/ship-api/auth/token')
            let token = await axios.post(api.href,
                { "api_key": config.acc_api_key }
            )

            api = new URL(config.acc_api + '/ship-api/cmd/acc-device')
            let test = await axios.get(api.href,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token.data.access_token
                    }
                }
            )
            await AccessControlDevice.deleteMany()
            let data = {}
            data.body = test.data
            console.log(data)
            await accessControlDevice(data).then(res => { console.log(res) }).catch(err => { console.log(err) })
        } catch (error) {
            console.log(error)

        }

    })
}

const get_workpermit_from_rabbitmq = async () => {
    try {
        const rabbitmqUrl = "amqp://rabbitmq:EIxPjtrCPdNyJBgX@10.224.163.184";
        const connection = await amqp.connect(rabbitmqUrl);
        const exchange = "wpm";
        const exchangeType = "fanout";
        const routingKey = "";
        const options = {
            durable: false
        };
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);
        const { err, queue } = await channel.assertQueue("", { exclusive: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.bindQueue(queue, exchange, routingKey);
        channel.consume(queue, (data) => {
            console.log("Received", JSON.parse(data.content.toString()));
            channel.ack(data, false, true);
            workPermit(JSON.parse(data.content.toString())).then(res => { console.log(res) }).catch(err => { console.log(err) })
        });
    } catch (error) {
        console.error(error)
    }
}

const compare_user = async () => {
    let api = new URL(config.auth_host + '/user/all?perPage=9999')
    let user_in_usa = await axios.get(api.href,
        {
            headers: {
                'Authorization': config.auth_api_key
            }
        }
    ).then(res => { return res.data.users })
    let user_in_usa_arr = user_in_usa.map(el => { return el.id })

    let data_in_db = await User.find()
    let data_in_db_arr = data_in_db.map(el => { return el.id })


    let create_user = []
    let delete_user = []
    for (let index = 0; index < user_in_usa.length; index++) {
        const element = user_in_usa[index];
        if (!data_in_db_arr.includes(element.id) && element.active == true) {
            let others = {
                fname: (element.firstName) ? element.firstName : (element.data.fname) ? element.data.fname : '',
                lname: (element.lastName) ? element.lastName : (element.data.lname) ? element.data.lname : '',

                code: element.data.employeeid,
                employeeid: element.data.employeeid
            }

            create_user.push({
                username: (element.username) ? element.username : element.email,
                status: 1,
                // group_id: group_id._id,
                id: element.id,
                others: others,
                email: element.email,
                login_status: true,
                created_date: new Date()
            })
        }
        if (element.active == false) {
            delete_user.push(element.id)
        }

    }

    for (let index = 0; index < data_in_db.length; index++) {
        const element = data_in_db[index];
        if (!user_in_usa_arr.includes(element.id)) {
            delete_user.push(element.id)
        }

    }

    if (create_user.length > 0) {
        await User.insertMany(create_user)
    }
    if (delete_user.length > 0) {
        await User.deleteMany({ id: { $in: delete_user } })

    }

}
export { check_row_expire, get_workpermit_from_acc, get_acc_from_acc, get_acc_device_from_acc, get_workpermit_from_rabbitmq, compare_user }