import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    VehicleID: { type: Number, required: true, unique: true },
    VehicleTypeTypeID: { type: String, required: true, unique: true },
    URL_Image: { type: String, required: false },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },

});

const VehicleType = mongoose.model('VehicleType', schema);

export default VehicleType
