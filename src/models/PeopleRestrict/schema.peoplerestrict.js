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
                    "name": "PTTStaffCode",
                    "type": "string",
                    "description": "รหัสพนักงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "AgencyName",
                    "type": "string",
                    "description": "หน่วยงานผู้ควบคุมงาน"
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
                    "type": "string",
                    "description": "รหัสสถสนที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "ScaffoldingType",
                    "type": "array",
                    "description": "ประเภทนั่งร้าน"
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