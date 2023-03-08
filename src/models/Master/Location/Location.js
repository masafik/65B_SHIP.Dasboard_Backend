import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    Location_ID: { type: Number, required: true, unique: true },
    Location_Name: { type: String, required: true, unique: true },
    Status: { type: Number, length: 1, required: true, enum: [0, 1] },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },

});

const Location = mongoose.model('Location', schema);

export default Location
