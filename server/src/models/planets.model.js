
const fs = require('fs');
const  path = require('path');
const {parse} = require('csv-parse');
const planets = require('./planets.mongo')


const habitablePlanet= [];
const isHabitable =(planet)=>{
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6 ;
}
const loadPlanetData = () =>{
    return new Promise((resolve,reject)=>{

        fs.createReadStream(path.join(__dirname , '..' , '..' , 'data' , 'kepler-data.csv'))
        .pipe(parse({
            comment :'#',
            columns : true,
        }))
        .on('data' , async(data)=>{
            if(isHabitable(data)){
                //TODO : change below with upsert = insert + update
                savePlanet(data);

                //without database
                // habitablePlanet.push(data);
            } 
        })
        .on('error',(err)=>{
            console.log(err);
            reject(err)
        })
        .on('end',async()=>{
            const numberOfPlanets = (await getAllPlanet()).length
            console.log(`${numberOfPlanets} planets habitable found !`);
            // console.log('habitable planet' , habitablePlanet);
            resolve()
        })
    })
}
async function getAllPlanet(){
    return await planets.find({})
}
async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName : planet.kepler_name,
        },{
            keplerName : planet.kepler_name,
        },{
            upsert:true,
        });
    }catch(err){
        console.error(`could not save planets ${err}`)
    }
}

module.exports = {
    getAllPlanet,
    loadPlanetData,
}