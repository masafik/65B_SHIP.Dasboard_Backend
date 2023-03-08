const schema = ({
    "/api/vehicle/all": {
        "get": {
            "x-swagger-router-controller": "vehicle/all",
            "tags": [
                "VEHICLE"
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
                    "name": "VehicleType",
                    "type": "array",
                    "description": "ประเภทยานพาหนะ"
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
    },
    "/api/vehicle/vehicle2": {
        "get": {
            "x-swagger-router-controller": "vehicle/vehicle2",
            "tags": [
                "VEHICLE"
            ],
            "description": "",
            "parameters": [

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