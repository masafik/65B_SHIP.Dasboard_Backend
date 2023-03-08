const schema = ({
    "/api/admin/logs/all": {
        "get": {
            "x-swagger-router-controller": "logs/all",
            "tags": [
                "LOGS"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "search",
                    "type": "string"
                },
                {
                    "in": "query",
                    "name": "limit",
                    "type": "number"
                }, {
                    "in": "query",
                    "name": "page",
                    "type": "number"
                }, {
                    "in": "query",
                    "name": "sort",
                    "type": "string"
                },
                {
                    "in": "query",
                    "name": "order",
                    "type": "string"
                },
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