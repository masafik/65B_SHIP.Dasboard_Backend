import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    TitleName: { type: String, required: false, comment: 'คำนำหน้า' },
    FirstName: { type: String, required: true, comment: 'ชื่อ' },
    LastName: { type: String, required: true, comment: 'นามสกุล' },
    PersonalID: { type: String, required: true, comment: 'เลขบัตรประชาชน/เลขที่หนังสือเดินทาง' },
    Position: { type: String, required: false, comment: 'ตำแหน่ง' },
    WorkPermitID: { type: String, required: false, comment: 'WorkPermitID' },
    SecureCardID: { type: String, required: false, comment: 'เลขที่บัตรแสดงตัว/เลขที่บัตรที่แลก' },
    CardTypeID: {
        type: String, required: false,
        comment: `
            "ประเภทบัตรที่แลก
            1=บัตรผู้มาติดต่อ,
            2=บัตรผู้เยี่ยมชม,
            3=บัตรผู้รับเหมา"`
    },
    PersonalTypeID: {
        type: String, required: true,
        comment: `
            "ประเภทบุคคล
            1=ผู้รับเหมาประจำ,
            2=ผู้รับเหมาชั่วคราว,
            3=ผู้มาติดต่อ,
            4= ผู้เยี่ยมชม, 
            5= พนักงาน ปตท. "`
    },
    ACC_ID: { type: String, required: false, comment: 'รหัสอุปกรณ์ที่สแกน' },
    ScanStatus: {
        type: String, required: false,
        comment: `
            "สถานะการสแกน
            1 = สแกนเข้า
            2 = สแกนออก"`
    },
    ScanDate: { type: Date, required: false, comment: 'วันที่ที่ทำการสแกน' },
    ScanTime: { type: String, required: false, comment: 'เวลาที่ทำการสแกน' },
    PersonGPS_ID: { type: String, required: false, comment: 'เลขที่อุปกรณ์ติดตามตัว' },
    VehicleGPS_ID: { type: String, required: false, comment: 'เลขที่อุปกรณ์ติดตามยานพาหนะ' },
    ExchangeCardDate: { type: Date, required: false, comment: 'วันที่ทำการแลกบัตร' },
    ExchangeCardTime: { type: String, required: false, comment: 'เวลาที่ทำการแลกบัตร' },
    ExchangeOTCard: { type: Boolean, required: false, comment: 'ช่วงแลกบัตรล่วงหน้า' },
    ExchangeCardStatus: {
        type: String, required: true,
        comment: `
            "สถานะการแลกบัตร (
            1=เข้า,
            2=ออก,
            3=คืนบัตร,
            4=De-Activate,
            5=Activate)"`
    },
    Reason: { type: String, required: false, comment: 'เหตุผล (เพิ่มเติม)' },
    PTTStaffCode: { type: String, required: false, comment: 'รหัสผู้ควบคุมงาน' },
    PTTStaffFirstName: { type: String, required: true, comment: 'ชื่อผู้ควบคุมงาน' },
    PTTStaffLastName: { type: String, required: true, comment: 'นามสกุลผู้ควบคุมงาน' },
    AgencyCode: { type: String, required: false, comment: 'รหัสหน่วยงานผู้ควบคุม' },
    AgencyName: { type: String, required: true, comment: 'ชื่อหน่วยงานผู้ควบคุม' },
    OwnerID: { type: String, required: false, comment: 'รหัสเจ้าของพื้นที่' },
    OwnerName: { type: String, required: false, comment: 'รหัสเจ้าของพื้นที่' },
    CompanyCode: { type: String, required: false, comment: 'รหัสบริษัท' },
    CompanyName: { type: String, required: false, comment: 'ชื่อบริษัท' },
    OnPlant: { type: Boolean, required: true, comment: 'สถานะการเข้าสู่ฐานการผลิต' },

    others: {
        scan_date_time: { type: Date, required: false },
        ScanDateTime1: { type: Date, required: false },
        ScanDateTime2: { type: Date, required: false },
        exchange_date_time: { type: Date, required: false },
        ExchangeCardDateTime1: { type: Date, required: false },
        ExchangeCardDateTime2: { type: Date, required: false },
        run_no: { type: Number, required: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const AccessControl = mongoose.model('AccessControl', schema);

export default AccessControl
