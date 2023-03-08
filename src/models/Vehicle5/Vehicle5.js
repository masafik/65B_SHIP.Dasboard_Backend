import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    id: { type: String, required: true, comment: 'รหัสประเภทรถ' },
    vehicle_type: { type: String, required: true, comment: 'ชื่อประเภทรถ' },
    Icon: { type: String, required: true, comment: 'URL Icon รถ ' },
    Icon_InMap: { type: String, required: true, comment: 'URL Icon รถ ที่ใช้แสดงผลในแผนที่' },
    others: {
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const Vehicle5 = mongoose.model('Vehicle5', schema);

export default Vehicle5
