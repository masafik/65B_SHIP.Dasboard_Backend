const schema = ({
    "/api/master/vehicletype/all": {
        "get": {
            "x-swagger-router-controller": "vehicletype/all",
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
    "/api/master/vehicletype/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "vehicletype/byid",
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
    "/api/master/vehicletype/add": {
        "post": {
            "x-swagger-router-controller": "vehicletype/add",
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
                            "VehicleTypeTypeID"
                        ],
                        "properties": {
                            "VehicleID": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "VehicleTypeTypeID": {
                                "type": "string",
                                "default": "รถจักรยานยนต์"
                            },
                            "URL_Image": {
                                "type": "string",
                                "default": ""
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
    "/api/master/vehicletype/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "vehicletype/put",
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
                            "VehicleID": {
                                "type": "number",
                                "default": 1,
                                "description": "ถ้าไม่ใส่ จะ default เป็น run no"
                            },
                            "VehicleTypeTypeID": {
                                "type": "string",
                                "default": "รถจักรยานยนต์"
                            },
                            "URL_Image": {
                                "type": "string",
                                "default": ""
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
    "/api/master/vehicletype/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "vehicletype/delete",
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