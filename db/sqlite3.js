`use strict`;

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const logger = require('../src/util/logger');

let db;

module.exports = {
	initialize: () => {
		return new Promise(async(resolve, reject) => {
			try {
				/* Replace with logger later */
				logger.system('Connecting to SQLite3 Database.');
				db = await new sqlite3.Database(':memory:');
				logger.system('Connection Successful.');
				
				/* Build Schemas  */
				let schemas = await fs.readdirSync('./db/schemas');

				for(let i= 0; i < schemas.length; i++) {
					logger.system(`Building Schema: ${schemas[i].split('.')[0].toUpperCase()}`);
					let _schema = require(`${process.cwd()}/db/schemas/${schemas[i]}`);
					await db.run(_schema)
				}
				resolve(db)	
			} catch(e) {
				reject(e)
			}
		})
	},

	getConnection: () => {
		return db
	},

	/* For testing later */
	seed: () => {

	}
}