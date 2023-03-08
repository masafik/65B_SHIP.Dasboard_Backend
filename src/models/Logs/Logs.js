import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    username: { type: String, unique: false, required: true, comment: 'ชื่อผู้ใช้งาน' },
    url: { type: String, required: true, comment: 'url' },
    action: { type: String, required: true, comment: 'การทำงาน' },
    query: { type: Object, required: false, comment: '' },
    body: { type: Object, required: false, comment: '' },
    params: { type: Object, required: false, comment: '' },
    error: { type: String, required: false, comment: 'ข้อผิดพลาด' },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' }
});

const Logs = mongoose.model('Logs', schema);

export default Logs
