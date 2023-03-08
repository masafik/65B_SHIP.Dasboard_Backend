import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    // Titlename: { type: String, required: false, comment: 'คำนำหน้า' },
    fullName: { type: String, required: true, comment: 'ชื่อ' },
    // Lastname: { type: String, required: true, comment: 'นามสกุล' },
    idCard: { type: String, required: true, comment: 'เลขบัตรประชาชน' },
    workPermitNo: { type: String, required: true, comment: 'เลข Work Permit' },
    workPermitID: { type: String, required: true, comment: 'รหัส Work Permitt' },
    workTypeID: { type: String, required: true, comment: 'รหัสประเภทของ work' },
    workType: { type: String, required: true, comment: 'ประเภทของ work' },
    description: { type: String, required: false, comment: 'รายละเอียดของงาน' },
    locationID: { type: String, required: true, comment: '' },
    subLocationID: { type: String, required: true, comment: '' },
    areaID: { type: String, required: false, comment: 'รหัสสถานที่ปฏิบัติงานหลัก(plant)' },
    location: { type: String, required: true, comment: '' },
    subAreaID: { type: String, required: false, comment: 'รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)' },
    subLocation: { type: String, required: false, comment: 'ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)' },
    workStartDate: { type: String, required: true, comment: 'วันที่เริ่มต้นของใบงาน' },
    workEndDate: { type: String, required: false, comment: 'วันที่สิ้นสุดของใบงาน' },
    workStartTime: { type: String, required: false, comment: 'เวลาเริ่มต้นการปฏิบัติงาน' },
    workEndTime: { type: String, required: false, comment: 'เวลาสิ้นสุดการปฏิบัติงาน' },
    companyCode: { type: String, required: true, comment: 'รหัสบริษัท' },
    companyName: { type: String, required: true, comment: 'ชื่อบริษัท' },
    supervisorCode: { type: String, required: true, comment: 'รหัสผู้ควบคุมงาน' },
    // SupervisorTitle: { type: String, required: true, comment: 'ชื่อผู้ควบคุมงาน' },
    supervisorFName: { type: String, required: true, comment: '' },
    supervisorLName: { type: String, required: true, comment: '' },
    // supervisorAgencyID: { type: String, required: true, comment: 'รหัสหน่วยงานผู้ควบคุม' },
    supervisorDep: { type: String, required: true, comment: 'ชื่อหน่วยงานผู้ควบคุม' },
    approverCode: { type: String, required: false, comment: 'รหัสเจ้าของพื้นที่' },
    approverFName: { type: String, required: false, comment: 'ชื่อเจ้าของพื้นที่' },
    approverLName: { type: String, required: false, comment: 'นามสกุลเจ้าของพื้นที่' },
    workpermitStatusId: { type: String, required: true, comment: 'รหัสสถานะใบงาน' },
    workpermitStatus: { type: String, required: true, comment: 'สถานะใบงาน' },
    gasMeasurement: { type: Date, required: false, comment: 'เวลาการตรวจวัดก๊าซล่าสุด' },
    impairmentName: { type: Array, required: false, comment: 'ชื่ออุปกรณ์ที่ Impairment' },
    impairment_No: { type: Array, required: false, comment: 'รหัสอุปกรณ์ที่ Impairment' },
    impairmentArea: { type: Array, required: false, comment: 'สถานที่ติดตั้งของอุปกรณ์ที่ Impairment' },
    lat: { type: Array, required: false, comment: 'พิกัด Latitude ของอุปกรณ์ที่ Impairment' },
    long: { type: Array, required: false, comment: 'พิกัด Longtitude ของอุปกรณ์ที่ Impairment' },
    impairmentType: { type: Array, required: false, comment: 'ประเภทของอุปกรณ์ที่ Impairment' },
    impairmentStart: { type: Array, required: false, comment: 'วัน-เวลาเริ่มต้นของอุปกรณ์ที่ Impairment' },
    impairmentEnd: { type: Array, required: false, comment: 'วัน-เวลาสิ้นสุดของอุปกรณ์ที่ Impairment' },
    impairmentStatus: { type: Array, required: false, comment: 'สถานะของอุปกรณ์ที่ Impairment มี 1= ไม่กีดขวาง 2= กีดขวาง' },
    others: {
        // type: Object, required: true, comment: 'ส่วนของระบบเราเอง',
        workingStart: { type: Date, required: true },
        workingEnd: { type: Date, required: false },
        // run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false }
    }

});
const WorkPermit = mongoose.model('WorkPermit', schema);

export default WorkPermit
