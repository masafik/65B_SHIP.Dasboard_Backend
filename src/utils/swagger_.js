const test = ({
    "/api/webhook/workpermit": {
        "post": {
            "x-swagger-router-controller": "webhook/workpermit",
            "tags": [
                "WEBHOOK"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "array",
                        "items": {
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "example": "matsafikss"
                                },
                                "user_id": {
                                    "type": "string",
                                    "example": "1"
                                },
                                "work_permit_id": {
                                    "type": "string",
                                    "example": "0001"
                                },
                                "people_type": {
                                    "type": "string",
                                    "example": "type01"
                                },
                                "work_name": {
                                    "type": "string",
                                    "example": "work01"
                                },
                                "work_detail": {
                                    "type": "string",
                                    "example": "work_detail01"
                                },
                                "objective": {
                                    "type": "string",
                                    "example": "objective01"
                                },
                                "location": {
                                    "type": "string",
                                    "example": "location01"
                                },
                                "working_day": {
                                    "type": "object",
                                    "example": " 2022-05-02",
                                    "format": "date"
                                },
                                "working_time": {
                                    "type": "string",
                                    "example": "2022-05-02T17:32:28Z",
                                    "format": "date-time"
                                },
                                "company_name": {
                                    "type": "string",
                                    "example": "company_name01"
                                },
                                "supervisor_name": {
                                    "type": "string",
                                    "example": "supervisor_name01"
                                },
                                "work_type": {
                                    "type": "string",
                                    "example": "work_type01"
                                },
                                "worksheet_status": {
                                    "type": "string",
                                    "example": "open"
                                }
                            }
                        }
                    }
                }
            ],
            "responses": {},
            "security": [
                {
                    "basicAuth": []
                }
            ]
        }
    }
})

export default test