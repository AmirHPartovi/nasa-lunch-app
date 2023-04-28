const request = require('supertest');
const app =require('../../app');

describe('test Get /planets',()=>{
    test('should be 200', async() => { 
        const response = request(app)
        .get('/planets')
        .expect('Content-Type',/json/)
        .expect(200)
    })
})