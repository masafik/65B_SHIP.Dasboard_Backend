const schema = ({
    "/api/people/all": {
        "get": {
            "x-swagger-router-controller": "people/all",
            "tags": [
                "PEOPLE"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "AgencyName",
                    "type": "array",
                    "description": "หน่วยงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "PTTStaffID",
                    "type": "array",
                    "description": "รหัสพนักงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "WorkingStartDate",
                    "type": "string",
                    "description": "วัน-เวลาเริ่มต้นการปฏิบัติงาน (Format yyyy-MM-dd HH:mm:ss)",
                    "example": "2022-05-06 08:00:00"
                },
                {
                    "in": "query",
                    "name": "WorkingEndDate",
                    "type": "string",
                    "description": "วัน-เวลาสิ้นสุดการปฏิบัติงาน (Format yyyy-MM-dd HH:mm:ss)",
                    "example": "2022-15-06 18:00:00"
                },
                {
                    "in": "query",
                    "name": "AreaName",
                    "type": "array",
                    "description": "รหัสสถสนที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย"
                },
                {
                    "in": "query",
                    "name": "WPM_AreaName",
                    "type": "array",
                    "description": "รหัสสถสนที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "WPM_SubAreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย"
                },
                {
                    "in": "query",
                    "name": "PeopleType",
                    "type": "array",
                    "description": "ประเภทบุคคล"
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