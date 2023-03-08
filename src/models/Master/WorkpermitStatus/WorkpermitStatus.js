import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    Status_ID: { type: String, required: true, unique: true },
    Status_Name: { type: String, required: true },
    Status_Desc: { type: String, required: true },
    Remark: { type: String, required: false },
    IsOpen: { type: Boolean, required: true },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },

});

const WorkpermitStatus = mongoose.model('WorkpermitStatus', schema);

export default WorkpermitStatus
