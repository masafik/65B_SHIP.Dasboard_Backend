import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    Name: { type: String, required: true, comment: 'ชื่อ-นามสกุล' },
    PersonalID: { type: String, required: false, comment: 'เลขบัตรประชาชน' },
    WorkPermitNo: { type: String, required: false, comment: 'เลข Work Permit' },
    EquipmentID: { type: String, required: true, comment: 'รหัสอุปกรณ์' },
    EquipmentTypeCode: { type: String, required: true, comment: 'รหัสประเภทของอุปกรณ์' },
    EquipmentType: { type: String, required: true, comment: 'ประเภทของอุปกรณ์' },
    EquipmentName: { type: String, required: true, comment: 'ชื่ออุปกรณ์' },
    Inspect_Status: {
        type: String, required: true,
        comment: `
            0 = อุปกรณ์ที่ไม่ Inspect
            1 = อุปกรณ์ที่ Inspect`
    },
    risk_equipment: {
        type: String, required: true,
        comment: `
            "0 = ไม่เป็นอุปกรณ์เสี่ยง
            1 = เป็นอุปกรณ์เสี่ยง"`
    },
    DateTime_In: { type: Date, required: true, comment: 'วัน-เวลา นำอุปกรณ์เข้าพื้นที่' },
    DateTime_Out: { type: Date, required: false, comment: 'วัน-เวลา นำอุปกรณ์ออกพื้นที่' },
    ExpiredDate: { type: Date, required: false, comment: `วันที่ หมดอายุสภาพ` },
    Description: { type: String, required: false, comment: 'รายละเอียดของงาน' },
    Objective: { type: String, required: false, comment: 'วัตถุประสงค์' },
    AreaID: { type: String, required: false, comment: 'รหัสสถานที่ปฏิบัติงานหลัก(plant)' },
    AreaName: { type: String, required: true, comment: 'ชื่อสถานที่ปฏิบัติงานหลัก(plant)' },
    CompanyID: { type: String, required: false, comment: 'รหัสบริษัท/หน่วยงาน' },
    CompanyName: { type: String, required: false, comment: 'ชื่อบริษัท/หน่วยงาน' },
    PTTStaffCode: { type: String, required: true, comment: 'รหัสผู้ควบคุมงาน' },
    PTTStaffName: { type: String, required: true, comment: 'ชื่อผู้ควบคุมงาน' },
    AgencyCode: { type: String, required: false, comment: 'รหัสหน่วยงานผู้ควบคุม' },
    AgencyName: { type: String, required: true, comment: 'ชื่อหน่วยงานผู้ควบคุม' },
    OwnerCode_1: { type: String, required: false, comment: 'รหัสผู้อนุมัติคนที 1' },
    OwnerName_1: { type: String, required: false, comment: 'ชื่อผู้อนุมัติคนที่ 1' },
    OwnerCode_2: { type: String, required: false, comment: 'รหัสผู้อนุมัติคนที 2' },
    OwnerName_2: { type: String, required: false, comment: 'ชื่อผู้อนุมัติคนที่ 2' },
    OwnerCode_3: { type: String, required: false, comment: 'รหัสผู้อนุมัติคนที 3' },
    OwnerName_3: { type: String, required: false, comment: 'ชื่อผู้อนุมัติคนที่ 3' },
    StatusID: { type: String, required: true, comment: 'รหัสสถานะใบงาน' },
    Status: { type: String, required: true, comment: 'สถานะใบงาน' },
    WarningStatus: { type: String, required: false, comment: 'สถานะแจ้งเตือนใกล้หมดอายุ / หมดอายุ' },
    others: {
        // scan_date_time: { type: Date, required: false },
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const Equipment = mongoose.model('Equipment', schema);

export default Equipment
