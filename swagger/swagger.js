'use strict';

const generateSchema = require('generate-schema');
const config = require(process.cwd()+'/config')
const definitions = require('../swagger/definitions');
const { headers, responses, consumes, produces } = require('../swagger/defaults');

const Swagger = {
	generateDocs: (paths) => {
		let newPaths = {};

		for(var path in paths) {
			paths[path].forEach((endpoint) => {
				let tmp = {
					tags: [],
					summary: endpoint.description || '',
					consumes: consumes || [],
					produces: produces || [],
					parameters: headers.concat(endpoint.parameters) || [],
					responses: responses || {}
				};
				tmp.tags.push(endpoint.tags);
				if(!newPaths[`${path}${endpoint.path}`])
					newPaths[`${path}${endpoint.path}`] = {};
				newPaths[`${path}${endpoint.path}`][endpoint.method.toLowerCase()] = tmp;
			});
		}

		// Generate definitions
		let _definitions = Swagger.generateDefinitions(definitions);

		let swaggerDocument = {
			"swagger": "2.0",
	    	"info": {
		        "description": config.app.description || "",
		        "version":  config.app.version || '1.0.0',
		        "title": config.app.name || '[App]'
	    	},
		    "host": config.app.host+':'+config.app.port || 8080,
		    "basePath": "",
		    "schemes": [
		        "http"
		    ],
		    "paths": newPaths,
		    "definitions": _definitions
		};

		return swaggerDocument  	
	},

	generateDefinitions: (definitions) => {
		let newDefinitions = {};

		for(var definition in definitions) {
			newDefinitions[definition] = Swagger.getProperties(definitions[definition]);
			newDefinitions[definition]['example'] = definitions[definition];
		}

		return newDefinitions;
	},

	getProperties: (element) => {
		return generateSchema.json(element);
	}
}	

module.exports = Swagger;