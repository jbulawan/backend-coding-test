'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./routes/router');

module.exports = () => {
    /* Express Configurations */
    app.use(bodyParser.json());
acac
    /* Initialize routes */
    router.initialize(app);

    return app;
};
