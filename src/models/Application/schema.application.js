const schema = ({
    "/api/admin/application/all": {
        "get": {
            "x-swagger-router-controller": "admin/application/all",
            "tags": [
                "APPLICATION"
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
    "/api/admin/application/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "admin/application/byid",
            "tags": [
                "APPLICATION"
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
    "/api/admin/application/add": {
        "post": {
            "x-swagger-router-controller": "admin/application/add",
            "tags": [
                "APPLICATION"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "application_name", "role"
                        ],
                        "properties": {
                            "application_name": {
                                "type": "string",
                                "default": "ชื่อเมนู",
                                "description": "ชื่อเมนู"
                            },
                            "parent_id": {
                                "type": "string",
                                "description": "_id ของแม่"
                            },
                            "is_menu": {
                                "type": "boolean",
                                "default": true,
                                "description": "เป็นเมนูหรือไม่"
                            },
                            "url": {
                                "type": "string",
                                "default": "/",
                                "description": "url"
                            },
                            "config": {
                                "type": "object",
                                "default": {},
                                "description": "config ต่าง ๆ "
                            },
                            "status": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            },
                            "role": {
                                "type": "array",
                                "minLength": 1,
                                "items": {
                                    "type": "object",
                                    "required": ["group_id"],
                                    "properties": {
                                        "group_id": {
                                            "type": "string",
                                            "description": "_id ของกลุ่ม"
                                        },
                                        "get": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "put": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "post": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "delete": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        }
                                    }

                                }

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
    "/api/admin/application/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "admin/application/put",
            "tags": [
                "APPLICATION"
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
                            "application_name": {
                                "type": "string",
                                "default": "ชื่อเมนู",
                                "description": "ชื่อเมนู"
                            },
                            "parent_id": {
                                "type": "string",
                                "description": "_id ของแม่"
                            },
                            "is_menu": {
                                "type": "boolean",
                                "default": true,
                                "description": "เป็นเมนูหรือไม่"
                            },
                            "url": {
                                "type": "string",
                                "default": "/",
                                "description": "url"

                            },
                            "config": {
                                "type": "object",
                                "default": {},
                                "description": "config ต่าง ๆ "
                            },
                            "order": {
                                "type": "number",
                                "default": 1,
                                "description": "ลำดับการจัดเรียง"
                            },
                            "status": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            },
                            "role": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": ["group_id"],
                                    "properties": {
                                        "group_id": {
                                            "type": "string",
                                            "description": "_id ของกลุ่ม"
                                        },
                                        "get": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "put": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "post": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        },
                                        "delete": {
                                            "type": "number",
                                            "default": 0,
                                            "enum": [0, 1]
                                        }
                                    }

                                }

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
    "/api/admin/application/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "admin/application/delete",
            "tags": [
                "APPLICATION"
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