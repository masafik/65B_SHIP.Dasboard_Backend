const schema = ({
    "/api/master/location/all": {
        "get": {
            "x-swagger-router-controller": "location/all",
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
    "/api/master/location/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "location/byid",
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
    "/api/master/location/add": {
        "post": {
            "x-swagger-router-controller": "location/add",
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
                            "Location_Name"
                        ],
                        "properties": {
                            "Location_ID": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "Location_Name": {
                                "type": "string",
                                "default": "GSP#1 Process"
                            },
                            "Status": {
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
    "/api/master/location/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "location/put",
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
                            "Location_ID": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "Location_Name": {
                                "type": "string",
                                "default": "GSP#1 Process"
                            },
                            "Status": {
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
    "/api/master/location/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "location/delete",
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