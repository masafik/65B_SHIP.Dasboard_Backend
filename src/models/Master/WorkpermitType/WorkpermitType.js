import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    WP_Type_ID: { type: String, required: true, unique: true },
    WP_Type_Name: { type: String, required: true },
    IsMain: { type: Number, length: 1, required: true, enum: [0, 1] },
    Seq: { type: Number, required: true },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },

});

const WorkpermitType = mongoose.model('WorkpermitType', schema);

export default WorkpermitType
