'use strict';

/* Controllers */
const RidesController = require('./RidesController');

/* Routes */
module.exports  = {
	basePath: '/rides',
	tags: 'Rides APIs',
	endpoints: [
		{
			method: 'GET',
			path: '/',
			description: 'Get List of Rides',
			parameters: [],
			middlewares: [],
			handler: RidesController.get
		},
		{
			method: 'GET',
			path: '/:rideID',
			description: 'Get Ride by ID',
			parameters: [],
			middlewares: [],
			handler: RidesController.getById
		},
		{
			method: 'POST',
			path: '/',
			description: 'Get List of Rides',
			parameters: [],
			middlewares: [],
			handler: RidesController.create
		}
	]
}
