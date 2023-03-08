import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    SAPWorkOrderNo: { type: String, length: 15, required: false, comment: 'SAP Maintenance No' },
    ScaffoldingCode: { type: String, length: 50, required: true, comment: 'เลขที่นั่งร้าน' },
    OwnerType: { type: String, length: 1, required: true, comment: 'ประเภทผู้ขอรายการ' },
    WorkOwnerID: { type: String, length: 10, required: false, comment: 'รหัสผู้ขอรายการ' },
    WorkName: { type: String, length: 120, required: true, comment: 'ชื่อ-นามสกุล' },
    PersonalID: { type: String, length: 13, required: true, comment: 'เลขบบัตรประชาชน' },
    WorkPermitNo: { type: String, length: 30, required: false, comment: 'เลข Work Permit' },
    ScaffoldingTypeID: { type: String, length: 4, required: true, comment: 'รหัสประเภทของนั่งร้าน' },
    ScaffoldingType: { type: String, length: 30, required: true, comment: 'ประเภทของนั่งร้าน' },
    ScaffoldingSubTypeID: { type: String, required: false, comment: 'รหัสประเภทย่อยของนั่งร้าน' },
    ScaffoldingSubType: { type: String, required: false, comment: 'ประเภทย่อยของนั่งร้าน' },
    Title: { type: String, length: 500, required: true, comment: 'ชื่องาน' },
    Description: { type: String, length: 500, required: false, comment: 'รายละเอียดงาน' },
    Objective: { type: String, length: 1000, required: false, comment: 'วัตถุประสงค์' },
    RemoveDate: { type: Date, required: false, comment: 'วันที่รื้อถอนนั่งร้าน' },
    Area: { type: String, length: 12, required: true, comment: 'รหัสสถานที่ปฏิบัติงานหลัก' },
    AreaName: { type: String, length: 30, required: true, comment: 'ชื่อสถานที่ปฏิบัติงานหลัก' },
    SubArea: { type: String, length: 12, required: false, comment: 'รหัสสถานที่ปฏิบัติงานย่อย' },
    SubAreaName: { type: String, length: 30, required: false, comment: 'ชื่อสถานที่ปฏิบัติงานย่อย' },
    FeaturesPropertiesColor: { type: String, required: false, comment: '' },
    Features: { type: Object, required: false, comment: 'ข้อมูลพิกัดนั่งร้าน' },
    // FeaturesProperties: { type: Object, required: false, comment: 'ข้อมูลคุณสมบัตินั่งร้าน' },
    // FeaturesPropertiesCentroid: { type: Array, required: false, comment: 'ข้อมูลจุดกึ่งกลางนั่งร้าน x,y' },
    FeaturesPropertiesCentroid_X: { type: Number, required: true, comment: 'จุดกึ่งกลาง Barrier/Geofence ตำแหน่ง Lattitude' },
    FeaturesPropertiesCentroid_Y: { type: Number, required: true, comment: 'จุดกึ่งกลาง Barrier/Geofence ตำแหน่ง Longtitude' },
    // FeaturesGeomety: { type: Object, required: false, comment: 'ข้อมูลรูปทรงนั่งร้าน' },
    // FeaturesGeometyType: { type: Number, required: false, comment: 'ประเภทของ Barrier/Geofence' },
    // FeaturesGeometyCoordinates: { type: Array, required: false, comment: 'พิกัดของ Geomety(x,y) แต่ละจุดของนั่งร้าน' },
    WorkingStartDate: { type: Date, length: 19, required: true, comment: 'วัน-เวลาเริ่มต้นการปฏิบัติงาน (Format yyyy-MM-dd HH:mm:ss)' },
    WorkingEndDate: { type: Date, length: 19, required: false, comment: 'วัน-เวลาเริ่มต้นการปฏิบัติงาน (Format yyyy-MM-dd HH:mm:ss)' },
    VendorCode: { type: String, length: 30, required: true, comment: 'รหัสบริษัทผู้รับเหมา' },
    VendorName: { type: String, length: 50, required: true, comment: 'ชื่อบริษัทผู้รับเหมา' },
    PTTStaffCode: { type: String, length: 10, required: true, comment: 'รหัสผู้ควบคุมงาน' },
    PTTStaff: { type: String, length: 100, required: true, comment: 'ชื่อผู้ควบคุมงาน' },
    AgencyID: { type: String, length: 10, required: false, comment: 'รหัสหน่วยงานผู้ควบคุม' },
    AgencyName: { type: String, length: 100, required: true, comment: 'ชื่อหน่วยงานผู้ควบคุม' },
    Owner: { type: String, length: 10, required: false, comment: 'รหัสเจ้าของพื้นที่' },
    OwnerName: { type: String, length: 100, required: false, comment: 'ชื่อเจ้าของพื้นที่' },
    WorkpermitType: { type: String, required: false, comment: 'ประเภทของ Work' },
    StatusID: { type: String, required: true, comment: 'รหัสสถานะใบงาน' },
    StatusName: { type: String, required: true, comment: 'สถานะใบงาน' },
    WarningStatusID: { type: String, required: false, comment: 'รหัสสถานะแจ้งเตือน' },
    WarningStatus: { type: String, required: false, comment: 'สถานะแจ้งเตือน' },
    InspectStatus: { type: String, required: false, comment: 'การแสดงผล' },
    InspectDateTime: { type: Date, required: false, comment: 'การแสดงผล' },
    others: {
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },

    }


});

const Scaffolding = mongoose.model('Scaffolding', schema);

export default Scaffolding
