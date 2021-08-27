`use strict`;
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db;

module.exports = {
	initialize: () => {
		return new Promise(async(resolve, reject) => {
			try {
				/* Replace with logger later */
				console.log('Connecting to SQLite3 Database.');
				db = await new sqlite3.Database(':memory:');
				console.log('Connection Successful.')
				
				/* Build Schemas  */
				let schemas = fs.readdirSync('./db/schemas');

				for(i= 0; i < schemas.length; i++) {
					console.log(`Building Schema: ${schemas[i].split('.')[0].toUpperCase()}`)
					let _schema = require(`${process.cwd()}/db/schemas/${schemas[i]}`);
					await db.run(_schema)
				}
				resolve(db)	
			} catch(e) {
				console.log(e)
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