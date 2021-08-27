'use strict';

const config = require('./config');

const db = require('./db/sqlite3');

db.initialize().then(() => {
	const app = require('./src/app')();
	app.listen(config.app.port, () => console.log(`App started and listening on port ${config.app.port}`));
});