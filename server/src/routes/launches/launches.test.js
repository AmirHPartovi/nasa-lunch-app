const request = require('supertest');
const app = require('../../app');
const {mongoConnect,mongoDisconnect} = require('../../services/mongo');


describe('connect mongo wrap',async()=>{
    beforeAll(async()=>{
        await mongoConnect()
    });
    afterAll(async()=>{
        await mongoDisconnect()
    })
    describe('test GET /launches/',()=>{
        test('it should response with 200',async()=>{
            const response = await request(app)
            .get('/launches')
            .expect('Content-Type',/json/)
            .expect(200)
            // expect(response).toBe(200);
        })
    })
    describe('test POST /launches/',()=>{
    
        const completeLaunchData ={
            mission : 'USS Enterprise',
            rocket:'NCC 1791-D',
            target:'Kepler-64 f',
            launchDate:'january 16 , 2040',
        };
        const launchWithInvalidDateType ={
            mission : 'USS Enterprise',
            rocket:'NCC 1791-D',
            target:'Kepler-64 f',
            launchDate:'hello',
        };
        const launchDataWithoutDate ={
            mission : 'USS Enterprise',
            rocket:'NCC 1791-D',
            target:'Kepler-64 f',
        };
        
        test('it should response with 201',async()=>{
            const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type',/json/)
            .expect(201)
        
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.launchDate).valueOf();
    
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        })
        test('it should catch Missing Required Data',async()=>{
    
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type',/json/)
            .expect(400)
    
        expect(response.body).toStrictEqual({
            error:"Missing Required Data"
        })
        })
        test('it should catch Invalid Date Type',async()=>{
            const response = await request(app)
            .post('/launches')
            .send(launchWithInvalidDateType)
            .expect('Content-Type',/json/)
            .expect(400)
    
        expect(response.body).toStrictEqual({
            error:"Invalid Date Type"
        })
        })
    })
})