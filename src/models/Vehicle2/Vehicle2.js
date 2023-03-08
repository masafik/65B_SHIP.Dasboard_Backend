import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    VehicleParkID: { type: String, required: true, comment: 'รหัสสถานที่จอดรถ' },
    VehicleParkName: { type: String, required: true, comment: 'ชื่อสถานที่จอดรถ' },
    AreaVehiclePark: { type: Object, required: true, comment: 'พิกัดสถานที่จอดรถ' },
    Remove_Park: { type: Date, required: false, comment: 'วัน-เวลา Remove ข้อมูล' },
    others: {
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const Vehicle2 = mongoose.model('Vehicle2', schema);

export default Vehicle2
