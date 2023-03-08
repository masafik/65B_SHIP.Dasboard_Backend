const schema = ({
    "/api/equipment/all": {
        "get": {
            "x-swagger-router-controller": "equipment/all",
            "tags": [
                "EQUIPMENT"
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
                    "name": "AreaName",
                    "type": "array",
                    "description": "สถานที่ติดตั้งอุปกรณ์"
                },
                {
                    "in": "query",
                    "name": "EquipmentType",
                    "type": "array",
                    "description": "ประเภทอุปกรณ์"
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
    "/api/equipment/risk": {
        "get": {
            "x-swagger-router-controller": "equipment/risk",
            "tags": [
                "EQUIPMENT"
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
                    "name": "AreaName",
                    "type": "string",
                    "description": "สถานที่ติดตั้งอุปกรณ์"
                },
                {
                    "in": "query",
                    "name": "EquipmentType",
                    "type": "array",
                    "description": "ประเภทอุปกรณ์"
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