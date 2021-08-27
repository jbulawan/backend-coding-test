'use strict';

const request = require('supertest');

const db = require('../db/sqlite3');
const app = require('../src/app')();

describe('API tests', () => {
    before((done) => {
        db.initialize()
        .then(() => done())
        .catch((e) => { return e })
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
});