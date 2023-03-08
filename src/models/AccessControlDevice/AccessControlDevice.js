import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    AccDeviceID: { type: String, required: true, comment: 'รหัสอุปกรณ์' },
    AccDeviceName: { type: String, required: true, comment: 'ชื่ออุปกรณ์' },
    Lat: { type: String, required: true, comment: 'พิกัด Latitude ของอุปกรณ์' },
    Long: { type: String, required: true, comment: 'พิกัด Longtitude ของอุปกรณ์' },
    AccDeviceStatus: { type: String, required: true, comment: 'สถานะอุปกรณ์ (0=offline, 1=online)' },
    AreaID: { type: String, required: true, comment: 'รหัสสถานที่ติดตั้งอุปกรณ์(plant)' },
    AreaName: { type: String, required: true, comment: 'ชื่อสถานที่ติดตั้งอุปกรณ์(plant)' },
    SubAreaID: { type: String, required: false, comment: 'รหัสสถานที่ติดตั้งอุปกรณ์ย่อย(อาคาร)' },
    SubAreaName: { type: String, required: false, comment: 'ชื่อสถานที่ติดตั้งอุปกรณ์ย่อย(อาคาร)' },
    others: {
        // run_no: { type: Number, required: true, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false }
    }
});

const AccessControlDevice = mongoose.model('AccessControlDevice', schema);

export default AccessControlDevice
