/* Generic Headers and Responses*/
module.exports = {
	headers: [
		// {
		// 	name: "x-client-id",
		// 	required: true,
		// 	description: 'Client Id',
		// 	in: "header",
		// 	type: "string"
		// },
		// {
		// 	name: "x-client-secret",
		// 	required: true,
		// 	description: 'Client Secret',
		// 	in: "header",
		// 	type: "string"
		// }
	],
	responses: {
		"200": {
			"description": "Successful Response",
			"type": "object",
			"schema": {
				"$ref": "#/definitions/Success"
			}
		},
		"401": {
			"description": "Unauthorized",
			"type": "object",
			"schema": {
				"$ref": "#/definitions/Unauthorized"
			}
		},
		"400": {
			"description": "Bad Request",
			"type": "object",
			"schema": {
				"$ref": "#/definitions/BadRequest"
			}
		},
		"500": {
			"description": "Internal Server Error",
			"type": "object",
			"schema": {
				"$ref": "#/definitions/InternalServerError"
			}
		}
	},
	consumes: ["application/json"],
	produces: ["application/json"],	
}