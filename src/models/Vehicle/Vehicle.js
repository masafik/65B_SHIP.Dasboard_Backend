import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    sap_no: {
        type: String,
        comment: "SAP Maintenance No"
    },
    Name: {
        type: String,
        comment: "ชื่อ-นามสกุล",
        required: true
    },
    IDCard: {
        type: String,
        comment: "เลขบัตรประชาชน",
        required: true
    },
    WorkPermitNo: {
        type: String,
        comment: "เลข Work Permit",
        required: false
    },
    VehicleID: {
        type: String,
        comment: "รหัสยานพาหนะ",
        required: true
    },
    VehicleTypeID: {
        type: String,
        comment: "รหัสประเภทของยานพาหนะ",
        required: true
    },
    VehicleType: {
        type: String,
        comment: "ประเภทของยานพาหนะ",
        required: true
    },
    License_Plate: {
        type: String,
        comment: "ทะเบียนรถ",
        required: false
    },
    VehicleParkID: {
        type: String,
        comment: "รหัสสถานที่จอดรถที่กำหนด",
    },
    VehiclePark: {
        type: String,
        comment: "ชื่อสถานที่จอดรถที่กำหนด"
    },
    WorkName: {
        type: String,
        comment: "ชื่องาน",
    },
    Detail: {
        type: String,
        comment: "รายละเอียดของงาน",
    },
    Objective: {
        type: String,
        comment: "วัตถุประสงค์",
    },
    AreaID: {
        type: String,
        comment: "รหัสสถานที่ปฏิบัติงานหลัก(plant)",
        required: true
    },
    AreaName: {
        type: String,
        comment: "ชื่อสถานที่ปฏิบัติงานหลัก(plant)",
        required: true
    },
    SubAreaID: {
        type: String,
        comment: "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
    },
    SubAreaName: {
        type: String,
        comment: "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
    },
    WPM_AreaID: {
        type: String,
        comment: "รหัสสถานที่ปฏิบัติงานหลัก(plant)",
        required: true
    },
    WPM_AreaName: {
        type: String,
        comment: "ชื่อสถานที่ปฏิบัติงานหลัก(plant)",
        required: true
    },
    WPM_SubAreaID: {
        type: String,
        comment: "รหัสสถานที่ปฏิบัติงานย่อย(อาคาร)",
    },
    WPM_SubAreaName: {
        type: String,
        comment: "ชื่อสถานที่ปฏิบัติงานย่อย(อาคาร)",
    },
    Lat: {
        type: String,
        comment: "พิกัด Latitude ของยานพาหนะ",
        required: true
    },
    Long: {
        type: String,
        comment: "พิกัด Longtitude ของพาหนะ",
        required: true
    },
    VehicleGPS_ID: {
        type: String,
        comment: "เลขที่อุปกรณ์ติดตามยานพาหนะ",
        required: true
    },
    WorkStartDate: {
        type: Date,
        comment: "วันที่เริ่มต้นของใบงาน",
        required: false
    },
    WorkEndDate: {
        type: Date,
        comment: "วันที่สิ้นสุดของใบงาน",
        required: false
    },
    WorkStartTime: {
        type: String,
        comment: "เวลาเริ่มต้นการปฏิบัติงาน",
        required: false
    },
    WorkEndTime: {
        type: String,
        comment: "เวลาสิ้นสุดการปฏิบัติงาน",
        required: false
    },
    CompanyCode: {
        type: String,
        comment: "รหัสบริษัท",
        required: true
    },
    CompanyName: {
        type: String,
        comment: "ชื่อบริษัท",
        required: true
    },
    PTTStaffCode: {
        type: String,
        comment: "รหัสผู้ควบคุมงาน",
        required: true
    },
    PTTStaffName: {
        type: String,
        comment: "ชื่อผู้ควบคุมงาน",
        required: true
    },
    AgencyCode: {

        type: String,
        comment: "รหัสหน่วยงานผู้ควบคุม",
        required: false
    },
    AgencyName: {
        type: String,
        comment: "ชื่อหน่วยงานผู้ควบคุม",
        required: true
    },
    OwnerCode: {
        type: String,
        comment: "รหัสเจ้าของพื้นที่",
        required: false
    },
    OwnerName: {
        type: String,
        comment: "ชื่อเจ้าของพื้นที่",
        required: false
    },
    WorkTypeID: {
        type: String,
        comment: "รหัสประเภทของ work",
        required: false
    },
    WorkTypeName: {
        type: String,
        comment: "ประเภทของ work",
        required: false
    },
    WorksheetStatusId: {
        type: String,
        comment: "รหัสสถานะใบงาน",
        required: false
    },
    WorksheetStatus: {
        type: String,
        comment: "สถานะใบงาน",
        required: false
    },
    Speed: {
        type: String,
        comment: "ความเร็วรถ ณ ขณะนั้น หน่วยกิโลเมตร/ชั่วโมง",
        required: true
    },
    WarningStatusId: {
        type: Array, items: {
            type: String,
            comment: "รหัสสถานะแจ้งเตือน",
        }
    },
    WarningStatus: {
        type: Array, items: {
            type: String,
            comment: "สถานะแจ้งเตือน",

        }
    },
    Remove_GPS: {
        type: Date,
        comment: "วัน-เวลา Remove ข้อมูล",
    },
    degree: {
        type: String,
        comment: "องศาของรถ",
        required: true
    },
    others: {
        WorkingStart: { type: Date, required: true },
        WorkingEnd: { type: Date, required: true },
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },

    }


});

const Vehicle = mongoose.model('Vehicle', schema);

export default Vehicle
