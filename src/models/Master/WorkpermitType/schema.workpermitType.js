const schema = ({
    "/api/master/workpermittype/all": {
        "get": {
            "x-swagger-router-controller": "workpermittype/all",
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
    "/api/master/workpermittype/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "workpermittype/byid",
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
    "/api/master/workpermittype/add": {
        "post": {
            "x-swagger-router-controller": "workpermittype/add",
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
                            "WP_Type_ID", "WP_Type_Name"
                        ],
                        "properties": {
                            "WP_Type_ID": {
                                "type": "string",
                                "default": "CD"
                            },
                            "WP_Type_Name": {
                                "type": "string",
                                "default": "ใบอนุญาตทำงานธรรมดา (Cold Work)"
                            },
                            "IsMain": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            },
                            "Seq": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
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
    "/api/master/workpermittype/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "workpermittype/put",
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
                            "WP_Type_ID": {
                                "type": "string",
                                "default": "CD"
                            },
                            "WP_Type_Name": {
                                "type": "string",
                                "default": "GSP#1 Process"
                            },
                            "IsMain": {
                                "type": "number",
                                "default": 1,
                                "enum": [0, 1]
                            },
                            "Seq": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
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
    "/api/master/workpermittype/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "workpermittype/delete",
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