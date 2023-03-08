const schema = ({
    "/api/master/scaffoldingtype/all": {
        "get": {
            "x-swagger-router-controller": "scaffoldingtype/all",
            "tags": [
                "MASTER"
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
    "/api/master/scaffoldingtype/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "scaffoldingtype/byid",
            "tags": [
                "MASTER"
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
    "/api/master/scaffoldingtype/add": {
        "post": {
            "x-swagger-router-controller": "scaffoldingtype/add",
            "tags": [
                "MASTER"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": [
                            "sObjectName", "sObjectShortName"
                        ],
                        "properties": {
                            "nObjectID": {
                                "type": "number",
                                "default": 1,
                                "description": "ID ประเภทนั่งร้าน ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "nHeadID": {
                                "type": "number",
                                "default": 1,
                                "description": "Parent ID ประเภทนั่งร้าน"
                            },
                            "nOrder": {
                                "type": "number",
                                "default": 1,
                                "description": "ลำดับการจัดเรียง/Key"
                            },
                            "sObjectName": {
                                "type": "string",
                                "default": "Light Duty",
                                "description": "ชื่อประเภทนั่งร้าน"
                            },
                            "sObjectShortName": {
                                "type": "string",
                                "default": "LD",
                                "description": "ชื่อย่อประเภทนั่งร้าน"
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
    "/api/master/scaffoldingtype/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "scaffoldingtype/put",
            "tags": [
                "MASTER"
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
                            "nObjectID": {
                                "type": "number",
                                "default": 1,
                                "description": "ID ประเภทนั่งร้าน ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "nHeadID": {
                                "type": "number",
                                "default": 1,
                                "description": "Parent ID ประเภทนั่งร้าน"
                            },
                            "nOrder": {
                                "type": "number",
                                "default": 1,
                                "description": "ลำดับการจัดเรียง/Key"
                            },
                            "sObjectName": {
                                "type": "string",
                                "default": "Light Duty",
                                "description": "ชื่อประเภทนั่งร้าน"
                            },
                            "sObjectShortName": {
                                "type": "string",
                                "default": "LD",
                                "description": "ชื่อย่อประเภทนั่งร้าน"
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
    "/api/master/scaffoldingtype/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "scaffoldingtype/delete",
            "tags": [
                "MASTER"
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