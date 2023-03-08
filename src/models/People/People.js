import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    Name: {
        type: String,
        comment: "ชื่อ-นามสกุล",
        required: true
    },
    PersonalID: {
        type: String,
        comment: "เลขบัตรประชาชน",
        required: true
    },
    WorkPermitNo: {
        type: String,
        comment: "เลข Work Permit",
        required: false
    },
    PeopleTypeID: {
        type: String,
        comment: "รหัสประเภทบุคคล",
        required: true
    },
    PeopleType: {
        type: String,
        comment: "ประเภทบุคคล (เช่น พนักงาน ปตท.,ผู้รับเหมา, เจ้าหน้าที่ความปลอดภัย, ผู้เฝ้าระวังไฟ, Visitor(ผู้มาติดต่อ,ผู้เยี่ยมชม) )",
        required: true
    },
    PeopleImage: {
        type: String,
        comment: "URL ของไอคอน",
        required: true
    },
    PersonGPS_ID: {
        type: String,
        comment: "เลขที่อุปกรณ์ติดตามตัว",
        required: false
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
        comment: "พิกัด Latitude ของบุคคล",
        required: true
    },
    Long: {
        type: String,
        comment: " พิกัด Longtitude ของบุคคล",
        required: true
    },
    WorkStartDate: {
        type: Date,
        comment: "วันที่เริ่มต้นการปฎิบัติงาน",
        required: false
    },
    WorkEndDate: {
        type: Date,
        comment: "วันที่สิ้นสุดการปฎิบัติงาน",
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
    CompanyID: {
        type: String,
        comment: "รหัสบริษัท",
        required: true
    },
    CompanyName: {
        type: String,
        comment: "ชื่อบริษัท",
        required: true
    },
    PTTStaffID: {
        type: String,
        comment: "รหัสผู้ควบคุมงาน",
        required: true
    },
    PTTStaffName: {
        type: String,
        comment: "ชื่อผู้ควบคุมงาน",
        required: true
    },
    AgencyID: {
        type: String,
        comment: "รหัสหน่วยงานผู้ควบคุม",
        required: false
    },
    AgencyName: {
        type: String,
        comment: "ชื่อหน่วยงานผู้ควบคุม",
        required: true
    },
    OwnerID: {
        type: String,
        comment: "รหัสเจ้าของพื้นที่",
        required: false
    },
    OwnerName: {
        type: String,
        comment: "ชื่อเจ้าของพื้นที่",
        required: false
    },
    WorkpermitType: {
        type: String,
        comment: "ประเภทของ work",
        required: false
    },
    WorkPermitStatusID: {
        type: String,
        comment: "รหัสสถานะใบงาน",
        required: false
    },
    WorkPermitStatus: {
        type: String,
        comment: "สถานะใบงาน",
        required: false
    },
    WarningStatusID: {
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
    WarningStatusDateTime: {
        type: Array, items: {
            type: Date,
            comment: "วันเวลาแจ้งเตือน",
        }

    },
    isEmail: {
        type: Boolean,
        comment: "true/false",
    },
    Email_Event: {
        type: String,
        comment: "รายละเอียด Email และชื่อบุคคลที่ได้รับอีเมลแจ้งเตือน เหตุการณ์ ชื่อผู้รับผิดชอบ เบอร์โทรศัพท์"
    },
    isEmailRepeat: {
        type: Boolean,
        comment: "true / false",
    },
    EmailEventRepeat: {
        type: String,
        comment: "รายละเอียด Email และชื่อบุคคลที่ได้รับอีเมลแจ้งเตือน เหตุการณ์ ชื่อหัวหน้าผู้รับผิดชอบ เบอร์โทรศัพท์"
    },
    others: {
        WorkingStart: { type: Date, required: true },
        WorkingEnd: { type: Date, required: true },
        run_no: { type: Number, requiredd: false, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, requiredd: true },
        created_by: { type: String, requiredd: false },
        updated_date: { type: Date, requiredd: false },
    }


});

const People = mongoose.model('People', schema);

export default People
