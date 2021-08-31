'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

let logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            name: 'file',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(process.cwd(), '/logs', `%DATE%.log`)
        }),
        new winston.transports.Console()
]});

module.exports = {
    system: (msg) => {
        logger.info(msg)
    },

    api: (req, type, obj) => {
        type = type.toUpperCase();
        let body = obj || req.body;
        logger.info(`[${type}] ${req.method.toUpperCase()} ${req.url} : ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} : body: ${JSON.stringify(body)}`)
    },

    error: (req, error, message) => {
        logger.error(`[ERROR] ${req.method.toUpperCase()} ${req.url} : ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} : error: ${error} - ${message}`)
    }    
};