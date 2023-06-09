const request = require('supertest');
const app =require('../../app');
const {mongoConnect,mongoDisconnect} = require('../../services/mongo');


describe('test Get /planets',()=>{
    beforeAll(async()=>{
        await mongoConnect();
    });
    afterAll(async()=>{
        await mongoDisconnect();
    });
    test('should be 200', async() => { 
        const response = await request(app)
        .get('/v1/planets')
        .expect('Content-Type',/json/)
        .expect(200)
    })
})