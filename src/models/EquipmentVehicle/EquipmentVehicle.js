import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    ObstructionTypeID: { type: String, required: true, comment: 'รหัสประเภทสิ่งกีดขวาง' },
    ObstructionType: { type: String, required: true, comment: 'ประเภทสิ่งกีดขวาง' },
    ObstructionID: { type: String, required: true, comment: 'รหัสสิ่งกีดขวาง' },
    ObstructionArea: { type: Object, required: true, comment: 'พิกัด' },
    ObstructionStatus: {
        type: String,
        required: true,
        comment: `
            สถานะอุปกรณ์มี
            1 = ไม่กีดขวาง
            2 = กีดขวาง
        ` },
    Remove_Obstruction: { type: Date, required: false, comment: 'วัน-เวลา Remove ข้อมูล' },
    others: {
        // scan_date_time: { type: Date, required: false },
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const EquipmentVehicle = mongoose.model('EquipmentVehicle', schema);

export default EquipmentVehicle
