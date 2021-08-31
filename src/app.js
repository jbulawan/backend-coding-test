'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const router = require('./routes/router');

module.exports = () => {
    /* Express Configurations */
    logger.system('API Starting')
    app.use(bodyParser.json());

    /* Log every request */
    app.use((req, res, next) => {
        logger.api(req, 'REQUEST', req.body || {});
        next();
    })

    /* Log responses */
    app.use((req, res, next) => {

        res.ok = (body) => {
            logger.api(req, 'RESPONSE', body);
            res.send(body);
        }
        res.error = (body) => {
            logger.error(req, body.error_code || '', body.message || '');
            res.send(body);
        }
        next();
    })

    /* Initialize routes */
    router.initialize(app);

    return app;
};
