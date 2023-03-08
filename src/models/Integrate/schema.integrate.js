const schema = ({
    "/api/integrate/scaffolding": {
        "get": {
            "x-swagger-router-controller": "integrate/scaffolding",
            "tags": [
                "INTEGRATE"
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
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
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
                    "name": "CompanyName",
                    "type": "array",
                    "description": "ชื่อบริษัท",
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
    "/api/integrate/people": {
        "get": {
            "x-swagger-router-controller": "integrate/people",
            "tags": [
                "INTEGRATE"
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
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
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
    "/api/integrate/vehicle": {
        "get": {
            "x-swagger-router-controller": "integrate/vehicle",
            "tags": [
                "INTEGRATE"
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
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
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
    "/api/integrate/workpermit": {
        "get": {
            "x-swagger-router-controller": "integrate/workpermit",
            "tags": [
                "INTEGRATE"
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
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
                },
                {
                    "in": "query",
                    "name": "CompanyName",
                    "type": "array",
                    "description": "ชื่อบริษัท",
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
    "/api/integrate/equipment": {
        "get": {
            "x-swagger-router-controller": "integrate/equipment",
            "tags": [
                "INTEGRATE"
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
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "CompanyName",
                    "type": "array",
                    "description": "ชื่อบริษัท",
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
    "/api/integrate/accesscontrol": {
        "get": {
            "x-swagger-router-controller": "integrate/accesscontrol",
            "tags": [
                "INTEGRATE"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "AreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานหลัก"
                },
                {
                    "in": "query",
                    "name": "SubAreaName",
                    "type": "array",
                    "description": "รหัสสถานที่ปฏิบัติงานย่อย"
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
                    "name": "AccDeviceName",
                    "type": "array",
                    "description": "อุปกรณ์ Access Control"
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