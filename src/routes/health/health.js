'use strict';

/* Controllers */
const HealthController = require('./HealthController');

/* Routes */
module.exports  = {
	basePath: '/health',
	tags: 'API Health Status',
	endpoints: [
		{
			method: 'GET',
			path: '/',
			description: 'Check API Health Status',
			parameters: [],
			middlewares: [],
			handler: HealthController.get
		}
	]
}
