const schema = ({
    "/api/master/pttstaffcode/all": {
        "get": {
            "x-swagger-router-controller": "pttstaffcode/all",
            "tags": [
                "MASTER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "AgencyName",
                    "type": "array",
                    "description": "ชื่อหน่วยงาน ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะเป็นการเลือกทั้งหมด"
                },
                {
                    "in": "query",
                    "name": "which",
                    "type": "string",
                    "enum": [
                        "ทั้งหมด",
                        "workpermit",
                        "scaffolding",
                        "accesscontrol",
                        "vehicle",
                        "people",
                        "equipment"
                    ],
                    "description": "เป็นการเลือกว่าจะเอาจาก DB ไหน ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะอาของทั้งหมด"
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
    "/api/master/subarea/all": {
        "get": {
            "x-swagger-router-controller": "subarea/all",
            "tags": [
                "MASTER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "AreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่หลัก ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะเป็นการเลือกทั้งหมด"
                },
                {
                    "in": "query",
                    "name": "which",
                    "type": "string",
                    "enum": [
                        "ทั้งหมด",
                        // "workpermit",
                        // "scaffolding",
                        // "accesscontrol",
                        "vehicle",
                        "people",
                        // "equipment"

                    ],
                    "description": "เป็นการเลือกว่าจะเอาจาก DB ไหน ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะอาของทั้งหมด"
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
    "/api/master/wpmsubarea/all": {
        "get": {
            "x-swagger-router-controller": "wpmsubarea/all",
            "tags": [
                "MASTER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "WPM_AreaName",
                    "type": "array",
                    "description": "ชื่อสถานที่หลัก ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะเป็นการเลือกทั้งหมด"
                },
                {
                    "in": "query",
                    "name": "which",
                    "type": "string",
                    "enum": [
                        "ทั้งหมด",
                        "workpermit",
                        "scaffolding",
                        "accesscontrol",
                        "vehicle",
                        "people",
                        // "equipment"
                    ],
                    "description": "เป็นการเลือกว่าจะเอาจาก DB ไหน ถ้าไม่ส่งมาหรือส่งคำว่า 'ทั้งหมด' จะอาของทั้งหมด"
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