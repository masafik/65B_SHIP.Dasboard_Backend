const schema = ({
    "/api/admin/group/all": {
        "get": {
            "x-swagger-router-controller": "admin/group/all",
            "tags": [
                "GROUP"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "search",
                    "type": "string",
                    "description": "ค้นหา"
                },
                {
                    "in": "query",
                    "name": "limit",
                    "type": "number",
                    "default": 10,
                    "description": "จำนวนข้อมูลต่อหน้า"
                },
                {
                    "in": "query",
                    "name": "page",
                    "type": "number",
                    "default": 1,
                    "description": "หน้า"
                },
                {
                    "in": "query",
                    "name": "sort",
                    "type": "string",
                    "description": "เรียงโดย",
                    "default": "group_id"
                },
                {
                    "in": "query",
                    "name": "order",
                    "type": "string",
                    "description": "",
                    "default": "acs",
                    "enum": [
                        "acs",
                        "desc"
                    ]
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
    "/api/admin/group/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "admin/group/byid",
            "tags": [
                "GROUP"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "path",
                    "name": "_id",
                    "type": "string",
                    "description": "เป็น _id ของ mongo",
                    "required": true
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
    "/api/admin/group/add": {
        "post": {
            "x-swagger-router-controller": "admin/group/add",
            "tags": [
                "GROUP"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "group_name", "others"
                        ],
                        "properties": {
                            "group_id": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "group_name": {
                                "type": "string",
                                "description": "ชื่อกลุ่ม"
                            },
                            "others": {
                                "type": "object",
                                "required": [
                                    "name", "isDefault", "isSuperRole", "description"
                                ],
                                "properties": {
                                    "name": { "type": "string", "description": 'ชื่อกลุ่ม ในระบบ authen' },
                                    "isDefault": { "type": "boolean", "description": 'เป็น default group' },
                                    "isSuperRole": { "type": "boolean", "description": 'เป็น super admin' },
                                    "description": { "type": "string", "description": 'คำอธิบาย' }
                                }
                            },
                            "status": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            }
                        }
                    }
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
    "/api/admin/group/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "admin/group/put",
            "tags": [
                "GROUP"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "path",
                    "name": "_id",
                    "type": "string",
                    "description": "_id",
                    "required": true
                },
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [],
                        "properties": {
                            "group_id": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "group_name": {
                                "type": "string",
                                "description": "ชื่อกลุ่ม",
                            },
                            "others": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string", "description": 'ชื่อกลุ่ม ในระบบ authen' },
                                    "isDefault": { "type": "boolean", "description": 'เป็น default group' },
                                    "isSuperRole": { "type": "boolean", "description": 'เป็น super admin' },
                                    "description": { "type": "string", "description": 'คำอธิบาย' }
                                }
                            },
                            "status": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            }
                        }
                    }
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
    "/api/admin/group/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "admin/group/delete",
            "tags": [
                "GROUP"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "path",
                    "name": "_id",
                    "type": "string",
                    "description": "_id",
                    "required": true
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
})

export default schema