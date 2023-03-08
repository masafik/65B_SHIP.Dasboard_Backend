import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    nObjectID: { type: Number, required: true, unique: true, comment: "ID ประเภทนั่งร้าน" },
    nHeadID: { type: Number, required: false, comment: "Parent ID ประเภทนั่งร้าน" },
    nOrder: { type: Number, required: false, comment: "ลำดับการจัดเรียง/Key" },
    sObjectName: { type: String, required: true, comment: "ชื่อประเภทนั่งร้าน" },
    sObjectShortName: { type: String, required: true, comment: "ชื่อย่อประเภทนั่งร้าน" },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },

});

const ScaffoldingType = mongoose.model('ScaffoldingType', schema);

export default ScaffoldingType
