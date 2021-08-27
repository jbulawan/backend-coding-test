/* Routers Register */
'use strict';
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

/* Swagger Docs*/
const Swagger = require(process.cwd()+'/swagger/swagger');

const TAG = '[ROUTER]';
const path = require('path');

module.exports = {
	initialize: (app) => {
		return new Promise((resolve, reject) => {
			var paths = {};
			try {
				/* Read each files in directory */
				fs.readdirSync(process.cwd()+'/src/routes/').forEach((module) => {
					if (module.toUpperCase() !== 'ROUTER.JS'){
						let route = `./${module}/${module.replace('.js', '')}`;
						// console.log(route)
						let router = require(route);
						let newPath = formatBasePath(router.basePath);
						paths[newPath] = registerRoute(app, router, module);
					}
				});

				/* Swagger - Api Docs */
				for (var key in paths) {
					paths[key].forEach((endpoint, index)=> {
						paths[key][index]['path'] = formatBasePath(paths[key][index]['path']);
					});
				}

				let swaggerDocument = Swagger.generateDocs(paths);
				app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { 
					customCss: '.swagger-ui .topbar { display: none }'
				}));
				
				app.get('/swagger', (req,res,next)=> {
					res.status(200).json(swaggerDocument);
				});

				/* Handle non existing endpoints */
				app.use('*', (req, res, next) => {
					res.error('Endpoint not found', 'Not Found', 404);
				});

				resolve(app)

			} catch(e) {
				throw (e)
			}

		});
	}
};


const registerRoute = (app, router, module) => {
	let basePath = router.basePath;
	let list = [];
	try {
		router.endpoints.forEach((endpoint) => {
			try {
				app[endpoint.method.toLowerCase()](basePath+endpoint.path, endpoint.middlewares, endpoint.handler);
				
				if(endpoint.path === '/')
					endpoint.path = '';
				endpoint.handler = '';
				endpoint.tags = router.tags;
				/* Replace with Winston Later */
				console.log(`${TAG}[${module.toUpperCase()}] Endpoint registered - ${endpoint.method.toUpperCase()} ${basePath+endpoint.path}`)
				list.push(endpoint);
			} catch (e) {
				throw e
			}
		});
	} catch (e) {
		throw Error(e);
	}
	return list
}

const formatBasePath = (basePath) => {
	let spl = basePath.split('/');
	spl.forEach((str, index) => {
		if (str.charAt(0) === ':') {
			let newStr = str.replace(':', '');
			spl[index] = `{${newStr}}`
		}
	});
	return spl.join('/');
}