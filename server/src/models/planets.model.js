
const fs = require('fs');
const  path = require('path');
const {parse} = require('csv-parse');


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
        .on('data' , (data)=>{
            if(isHabitable(data)){
                habitablePlanet.push(data);
            } 
        })
        .on('error',(err)=>{
            console.log(err);
            reject(err)
        })
        .on('end',()=>{
            // console.log(`${habitablePlanet.length} planets habitable found !`);
            // console.log('habitable planet' , habitablePlanet);
            resolve()
        })
    })
}
function getAllPlanet(){
    return habitablePlanet
}

module.exports = {
    getAllPlanet,
    loadPlanetData,
}