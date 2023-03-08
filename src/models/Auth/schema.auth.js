const schema = ({
    "/api/auth/login": {
        "post": {
            "x-swagger-router-controller": "auth/login",
            "tags": [
                "AUTH"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": ["username", "password"],
                        "properties": {
                            "username": {
                                "type": "string",
                                "default": "1510100998667"
                            },
                            "password": {
                                "type": "string",
                                "default": "1234"
                            }
                        }
                    }
                }
            ],
            "responses": {}
        }
    },
    "/api/auth/login/ad": {
        "post": {
            "x-swagger-router-controller": "auth/login",
            "tags": [
                "AUTH"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "schema": {
                        "type": "object",
                        "required": ["username"],
                        "properties": {
                            "username": {
                                "type": "string",
                                "default": "test@gmail.com",
                                "description": "email"
                            }
                        }
                    }
                }
            ],
            "responses": {}
        }
    },
    "/api/auth/logout": {
        "get": {
            "x-swagger-router-controller": "auth/logout",
            "tags": [
                "AUTH"
            ],
            "description": "",
            "parameters": [],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/auth/mydata": {
        "get": {
            "x-swagger-router-controller": "auth/mydata",
            "tags": [
                "AUTH"
            ],
            "description": "",
            "parameters": [],
            "responses": {},
            "security": [
                {
                    "Bearer": []
                }
            ]
        }
    },
    "/api/oauth/token": {
        "post": {
            "x-swagger-router-controller": "auth/login",
            "tags": [
                "AUTH"
            ],
            "description": "",
            "parameters": [
                {
                    "in": "query",
                    "name": "grant_type",
                    "type": "string",
                    "enum": ["client_credentials", "refresh_token"],
                    "required": true
                },
                {
                    "in": "query",
                    "name": "client_id",
                    "type": "string",

                },
                {
                    "in": "query",
                    "name": "client_secret",
                    "type": "string"

                },
                {
                    "in": "query",
                    "name": "refresh_token",
                    "type": "string"
                }
            ],
            "responses": {}
        }
    },
})

export default schema