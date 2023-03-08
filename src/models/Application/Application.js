import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    application_name: { type: String, unique: true, required: true, comment: 'ชื่อเมนู' },
    parent_id: { type: String, required: false, default: "", comment: '_id ของแม่' },
    is_menu: { type: Boolean, required: true, default: true, comment: 'เป็นเมนูหรือไม่' },
    url: { type: String, unique: true, required: false, comment: 'url' },
    config: { type: Object, required: false, comment: 'config ต่าง ๆ' },
    order: { type: Number, required: true, comment: "ลำดับการจัดเรียง" },
    status: { type: Number, required: true, comment: 'สถานะ' },
    created_date: { type: Date, required: true, comment: 'วันที่สร้างข้อมูล' },
    created_by: { type: String, required: false, comment: 'ผู้สร้างข้อมูล' },
    updated_date: { type: Date, required: false, comment: 'วันที่แก้ไขข้อมูล' },
    updated_by: { type: String, required: false, comment: 'ผู้แก้ไขข้อมูล' },
});

const Application = mongoose.model('Application', schema);

export default Application
