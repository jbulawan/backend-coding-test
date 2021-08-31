'use strict';

const config = require('./config');
const logger = require('./src/util/logger');
const db = require('./db/sqlite3');

db.initialize().then(() => {
	const app = require('./src/app')();
	app.listen(config.app.port, () => logger.system(`App started and listening on port ${config.app.port}`));
});