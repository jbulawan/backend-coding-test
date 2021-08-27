/* Request Body Schemas for Documentation */
/* Keys must be unique */

module.exports = {
	/* Generic Responses */
	Success: {
		"result": "success",
		"message": "<message>",
		"data": "<data>"
	},
	
	Unauthorized: {
		"result": "failed",
		"message": "Unauthorized",
		"error": "<error details>"
	},

	BadRequest: {
		"result": "failed",
		"message": "<message>",
		"error": "<error details>"
	},

	InternalServerError: {
		"result": "failed",
		"message": "<message>",
		"error": "<error details>"
	}
}