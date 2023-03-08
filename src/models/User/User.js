import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, comment: 'ชื่อผู้ใช้งาน' },
    // password: { type: String, required: true, comment: 'รหัสผ่าน' },
    group_id: { type: String, required: false, comment: '_id กลุ่มผู้ใช้งาน' },
    status: { type: Number, required: true, comment: 'สถานะ' },
    id: { type: String, required: true, comment: 'id จาก ระบบ authen' },
    others: {
        code: { type: String, required: false, comment: 'ที่ไว้เช็คสิทธิต่าง ๆ' },
        fname: { type: String, required: false },
        lname: { type: String, required: false },
        employeeid: { type: String, required: false, comment: 'ที่ไว้เช็คสิทธิต่าง ๆ' },
    },
    email: { type: String, required: false, comment: 'email จาก ระบบ authen' },
    login_status: { type: Boolean, required: false, comment: 'สถานะการ login' },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },
});

const User = mongoose.model('User', schema);

export default User
