const schema = ({
    "/api/scaffolding/all": {
        "get": {
            "x-swagger-router-controller": "scaffolding/all",
            "tags": [
                "SCAFFOLDING"
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
                    "name": "PTTStaffCode",
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
                    "name": "ScaffoldingType",
                    "type": "array",
                    "description": "ประเภทนั่งร้าน"
                },
                {
                    "in": "query",
                    "name": "AreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย"
                },
                {
                    "in": "query",
                    "name": "VendorName",
                    "type": "array",
                    "description": "ชื่อบริษัทผู้รับเหมา"
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