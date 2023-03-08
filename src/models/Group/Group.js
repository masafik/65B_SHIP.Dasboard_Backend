import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    group_name: { type: String, unique: true, required: true, comment: 'ชื่อกลุ่ม' },
    status: { type: Number, required: true, comment: 'สถานะ' },
    others: {
        id: { type: String, required: true, comment: 'id จาก ระบบ authen' },
        isDefault: { type: Boolean, required: true, comment: 'เป็น default group' },
        isSuperRole: { type: Boolean, required: true, comment: 'เป็น super admin' },
        name: { type: String, unique: true, required: true, comment: 'ชื่อกลุ่ม' },
        description: { type: String, required: true, comment: 'คำอธิบาย' }
    },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },
});

const Group = mongoose.model('Group', schema);

export default Group
