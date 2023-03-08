import { Validator } from 'express-json-validator-middleware'
// let ajv = new Ajv({ allErrors: true })



const validateSchema = (parameters) => {
    const validator = new Validator();

    let errors = []
    let schema = {}

    let schema_query = {
        properties: {},
        required: [],
        type: 'object'
    }
    let schema_body = {
        properties: {},
        required: [],
        type: 'object'
    }

    let schema_params = {
        properties: {},
        required: [],
        type: 'object'
    }


    parameters.map(param => {
        if (param.in == 'query') {
            schema_query.properties[param.name] = {
                type: param.type,
                ...(param.enum) ? { enum: param.enum } : {}
            }
            if (param.required == true) {
                schema_query.required.push(param.name)
            }

        } else if (param.in == 'body') {
            schema_body.properties = param.schema.properties
            schema_body.type = param.schema.type
            schema_body.required = param.schema.required

            // if (param.schema.type == 'array') {
            //     schema_body.required = param.schema.items.required
            // }

        } else if (param.in == 'path') {
            // schema_body.properties = param.schema.properties
            schema_params.properties[param.name] = {
                type: param.type,
                ...(param.enum) ? { enum: param.enum } : {}
            }
        }
    })

    schema = {
        "query": schema_query,
        "body": schema_body,
        "params": schema_params
    }

    // console.log(schema)

    return validator.validate(schema)

}


export default validateSchema;

