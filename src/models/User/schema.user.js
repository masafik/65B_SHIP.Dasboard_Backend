const schema = ({
    "/api/admin/user/all": {
        "get": {
            "x-swagger-router-controller": "admin/user/all",
            "tags": [
                "USER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "search",
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
                    "description": "เรียงโดย"
                },
                {
                    "in": "query",
                    "name": "order",
                    "type": "string",
                    "description": "",
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
    "/api/admin/user/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "admin/user/byid",
            "tags": [
                "USER"
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
    "/api/admin/user/add": {
        "post": {
            "x-swagger-router-controller": "admin/user/add",
            "tags": [
                "USER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "username", "password", "group_id", "others"
                        ],
                        "properties": {
                            "username": {
                                "type": "string",
                                "description": "ชื่อผู้ใช้"
                            },
                            "password": {
                                "type": "string",
                                "description": "รหัสผ่าน"
                            },
                            "group_id": {
                                "type": "string",
                                "description": "_id ของกลุ่ม"
                            },
                            "others": {
                                "type": "object",
                                "description": "ข้อมูลในระบบ authen",
                                "required": [
                                    "code", "fname", "lname"
                                ],
                                "properties": {
                                    "code": {
                                        "type": "string",
                                        "description": "ที่ไว้เช็คสิทธิต่าง ๆ"
                                    },
                                    "fname": { "type": "string", },
                                    "lname": { "type": "string", }
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
    "/api/admin/user/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "admin/user/put",
            "tags": [
                "USER"
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
                            "username": {
                                "type": "string",
                                "description": "ชื่อผู้ใช้"
                            },
                            "password": {
                                "type": "string",
                                "description": "รหัสผ่าน"
                            },
                            "group_id": {
                                "type": "string",
                                "description": "_id ของกลุ่ม"
                            },
                            "others": {
                                "type": "object",
                                "description": "ข้อมูลในระบบ authen",
                                "properties": {
                                    "code": {
                                        "type": "string",
                                        "description": "ที่ไว้เช็คสิทธิต่าง ๆ"
                                    },
                                    "fname": { "type": "string", },
                                    "lname": { "type": "string", }
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
    "/api/admin/user/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "admin/user/delete",
            "tags": [
                "USER"
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