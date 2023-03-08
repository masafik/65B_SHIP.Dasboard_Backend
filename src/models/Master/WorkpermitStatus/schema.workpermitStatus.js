const schema = ({
    "/api/master/workpermitstatus/all": {
        "get": {
            "x-swagger-router-controller": "workpermitstatus/all",
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
    "/api/master/workpermitstatus/byid/{_id}": {
        "get": {
            "x-swagger-router-controller": "workpermitstatus/byid",
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
    "/api/master/workpermitstatus/add": {
        "post": {
            "x-swagger-router-controller": "workpermitstatus/add",
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
                            "Status_ID", "Status_Name", "Status_Desc"
                        ],
                        "properties": {
                            "Status_ID": {
                                "type": "string",
                                "default": "W01"
                            },
                            "Status_Name": {
                                "type": "string",
                                "default": "Draft"
                            },
                            "Status_Desc": {
                                "type": "string",
                                "default": "บันทึกร่าง"
                            },
                            "Remark": {
                                "type": "string",
                                "default": ""
                            },
                            "IsOpen": {
                                "type": "boolean",
                                "default": true
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
    "/api/master/workpermitstatus/put/{_id}": {
        "put": {
            "x-swagger-router-controller": "workpermitstatus/put",
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
                            "Status_ID": {
                                "type": "string",
                                "default": "W01"
                            },
                            "Status_Name": {
                                "type": "string",
                                "default": "Draft"
                            },
                            "Status_Desc": {
                                "type": "string",
                                "default": "บันทึกร่าง"
                            },
                            "Remark": {
                                "type": "string",
                                "default": ""
                            },
                            "IsOpen": {
                                "type": "boolean",
                                "default": true
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
    "/api/master/workpermitstatus/delete/{_id}": {
        "delete": {
            "x-swagger-router-controller": "workpermitstatus/delete",
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