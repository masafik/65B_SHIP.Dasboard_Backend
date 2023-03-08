import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    RestrictedAreaID: {
        type: String,
        comment: "รหัสสถานที่ห้ามเข้า",
        required: true

    },
    RestrictedAreaName: {
        type: String,
        comment: "ชื่อสถานที่ห้ามเข้า",
        required: true
    },
    RestrictedArea: {
        type: Object,
        comment: "พิกัดสถานที่ห้ามเข้า",
        required: true
    },
    others: {
        run_no: { type: Number, requiredd: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, requiredd: true },
        created_by: { type: String, requiredd: false },
        updated_date: { type: Date, requiredd: false },
    }


});

const PeopleRestrict = mongoose.model('PeopleRestrict', schema);

export default PeopleRestrict
