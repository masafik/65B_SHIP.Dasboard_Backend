const schema = ({
    "/api/workpermit/all": {
        "get": {
            "x-swagger-router-controller": "workpermit/all",
            "tags": [
                "WORKPERMIT"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "supervisorDep",
                    "type": "array",
                    "description": "ชื่อหน่วยงานผู้ควบคุม"
                },
                {
                    "in": "query",
                    "name": "supervisorCode",
                    "type": "array",
                    "description": "รหัสพนักงานผู้ควบคุมงาน"
                },
                {
                    "in": "query",
                    "name": "startDateTime",
                    "type": "string",
                    "example": "2022-05-15 08:00:00",
                    "description": "วัน-เวลาเริ่มต้นการปฏิบัติงาน"
                },
                {
                    "in": "query",
                    "name": "endDateTime",
                    "type": "string",
                    "example": "2022-06-15 08:00:00",
                    "description": "วัน-เวลาสิ้นสุดการปฏิบัติงาน"
                },
                {
                    "in": "query",
                    "name": "workpermitStatusId",
                    "type": "array",
                    "description": "รหัสสถานะใบงาน"
                },
                {
                    "in": "query",
                    "name": "workTypeID",
                    "type": "array",
                    "description": "รหัสประเภทของ work"
                },
                {
                    "in": "query",
                    "name": "location",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานหลัก(plant)"
                },
                {
                    "in": "query",
                    "name": "subLocation",
                    "type": "array",
                    "description": "ชื่อสถานที่ปฏิบัติงานย่อย"
                },
                {
                    "in": "query",
                    "name": "companyName",
                    "type": "array",
                    "description": "รหัสบริษัท",
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