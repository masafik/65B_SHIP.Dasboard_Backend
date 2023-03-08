const schema = ({
    "/api/accesscontrol/all": {
        "get": {
            "x-swagger-router-controller": "accesscontrol/all",
            "tags": [
                "ACCESSCONTROL"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "PTTStaffCode",
                    "type": "array",
                    "description": "รหัสพนักงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "AgencyName",
                    "type": "array",
                    "description": "หน่วยงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "Scan_Date_Time_Start",
                    "type": "string",
                    "description": "วัน-เวลาสแกนเริ่มต้น (Format yyyy-MM-dd HH:mm:ss)",
                    "example": "2022-05-06 08:00:00"
                },
                {
                    "in": "query",
                    "name": "Scan_Date_Time_End",
                    "type": "string",
                    "description": "วัน-เวลาสแกนสิ้นสุด (Format yyyy-MM-dd HH:mm:ss)",
                    "example": "2022-15-06 18:00:00"
                },
                {
                    "in": "query",
                    "name": "AccDeviceName",
                    "type": "array",
                    "description": "อุปกรณ์ Access Control"
                },
                {
                    "in": "query",
                    "name": "PersonalTypeName",
                    "type": "array",
                    "description": "ประเภทกลุ่มบุคคล"
                },
                {
                    "in": "query",
                    "name": "AreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ติดตั้งอุปกรณ์(plant)"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ติดตั้งอุปกรณ์ย่อย(อาคาร)"
                },
                {
                    "in": "query",
                    "name": "CompanyName",
                    "type": "array",
                    "description": "ชื่อบริษัท",
                },
                {
                    "in": "query",
                    "name": "notification",
                    "type": "array",
                    "description": "การแจ้งเตือน"
                }
            ],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    }
})

export default schema