
// require('dotenv').config()

import dotenv from 'dotenv'
import { utilConvertStringToNumberSeconds } from './function.js'
dotenv.config()

const config = {

    server_port: process.env.PORT || '3001',
    mongo_db: process.env.MONGO_DB,
    config_access_token_expiration_time: process.env.ACCESS_TOKEN_EXPIRATION_TIME ? utilConvertStringToNumberSeconds(process.env.ACCESS_TOKEN_EXPIRATION_TIME) : utilConvertStringToNumberSeconds("60s"),
    config_refresh_token_expiration_time_oauth: process.env.REFRESH_TOKEN_EXPIRATION_TIME_OAUTH ? utilConvertStringToNumberSeconds(process.env.REFRESH_TOKEN_EXPIRATION_TIME_OAUTH) : utilConvertStringToNumberSeconds("30d"),

    config_access_oauth_token_expiration_time: process.env.ACCESS_OAUTH_TOKEN_EXPIRATION_TIME ? utilConvertStringToNumberSeconds(process.env.ACCESS_OAUTH_TOKEN_EXPIRATION_TIME) : utilConvertStringToNumberSeconds("30m"),
    config_refresh_oauth_token_expiration_time_oauth: process.env.REFRESH_OAUTH_TOKEN_EXPIRATION_TIME ? utilConvertStringToNumberSeconds(process.env.REFRESH_OAUTH_TOKEN_EXPIRATION_TIME) : utilConvertStringToNumberSeconds("1d"),

    swagger_pass: process.env.SWAGGER_PASS,
    swagger_user: process.env.SWAGGER_USER,

    auth_host: process.env.AUTH_HOST,
    auth_api_key: process.env.AUTH_APIKEY,
    auth_app_id: process.env.AUTH_APPID,

    acc_api: process.env.ACC_API,
    acc_api_key: process.env.ACC_API_KEY,

    menu_workpermit_id: process.env.MENU_WORKPERMIT_ID,
    menu_scaffolding_id: process.env.MENU_SCAFFOLDING_ID,
    menu_accesscontrol_id: process.env.MENU_ACCESSCONTROL_ID,
    menu_equipment_risk_id: process.env.MENU_EQUIPMENT_RISK_ID,
    menu_equipment_all_id: process.env.MENU_EQUIPMENT_ALL_ID,
    menu_vehicle_id: process.env.MENU_VEHICLE_ID,
    menu_peopletracking_id: process.env.MENU_PEOPLETRACKING_ID,

    ptt_group_id: process.env.PTT_GROUP_ID





}
export default config

