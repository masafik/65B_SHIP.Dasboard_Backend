import mongoose from 'mongoose'
import fs from "fs";
import config from './config.js'
import Logs from '../models/Logs/Logs.js';
import sanitize from 'mongo-sanitize';

let insert_log = async (req, action, error) => {

    let fullUrl = ' '
    let username = ' '
    if (req.username) {
        fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        username = req.username
    }


    await Logs.create({
        username: sanitize(username),
        url: sanitize(fullUrl),
        action: sanitize(action),
        qeury: sanitize(req.qeury),
        body: sanitize(req.body),
        params: sanitize(req.params),
        error: sanitize(error),
        created_date: new Date(),
        created_by: sanitize(req._id)

    })
}

export default insert_log

