const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo');
const axios = require('axios')
// const launches = new Map();

let DEFAULT_LATEST_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'



// const launch ={
//     flightNumber:100, //flight_number
//     mission:'kepler Exploration X', //name
//     rocket:'Explorer IS1',  //rocket.name
//     launchDate: new Date('December 12 , 2035'),//date_local
//     target: 'Kepler-442 b',// not applicable
//     customers:['NOAA','NASA'], //payloads.customers
//     upcoming:true,//upcoming
//     success:true,//success
// };

// launches.set(launch.flightNumber,launch);
// saveLaunches(launch)
async function populateLaunchData(){
    console.log('Downloading launch data ...')
    const response = await axios.post(SPACEX_API_URL,{
        query:{},
        options:{
            // page:3,
            // limit:20,
            pagination:false,
            populate:[
                {
                    path:'rocket',
                    select:{
                        name:1
                    }
                },
                {
                    path:'payloads',
                    select:{
                        customers:1
                    }
                },
            ],
        },
    });
    if(response.status !== 200){
        throw new Error('cant download spaceX launch data ...')
    }
    const launchDocs = response.data.docs;
    
    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        });
        const launch={
            flightNumber:launchDoc['flight_number'],
            mission:launchDoc['name'],
            rocket:launchDoc['rocket']['name'],
            launchDate:launchDoc['date_local'],
            upcoming:launchDoc['upcoming'],
            success:launchDoc['success'],
            customers,
        }
        console.log(`${launch.customers}`);
        // console.log(`${launch.flightNumber} , ${launch.mission}`)
        await saveLaunches(launch)
    }

}
async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber:1,
        mission:'FalconSat',
        rocket:'Falcon 1',
    })
    if(firstLaunch){
        console.log('launch data already loaded');
        return;
    }else{
        await populateLaunchData();
    }

}
async function findLaunch(filter){
    return await launchesDatabase.findOne(filter)
}
async function launchHasExist (launchId){
    return await findLaunch({
        flightNumber:launchId,
        //    return launches.has(launchId);
    })
}
async function getLatestFlightNumber(){
    const latestFlight = await launchesDatabase
    .findOne()
    .sort('-flightNumber')
    

    if(!latestFlight){
        return DEFAULT_LATEST_FLIGHT_NUMBER;
    }
    return latestFlight.flightNumber;
}

async function getAllLaunches(skip,limit){
    // return Array.from(launches.values())
    return await launchesDatabase
    .find({},{"_id":0,"__V":0,})
    .sort({flightNumber : 1})
    .skip(skip)
    .limit(limit)
    
};

async function saveLaunches(launch){

     await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    },
    launch,
    {
        upsert:true
    })
}

async function scheduleNewLaunch(launch){

    const planet = await planets.findOne({
        keplerName : launch.target,
    })
    if(!planet){
        throw new Error('target does not match to habitable planets')
    }

    const latestFlightNumber =await getLatestFlightNumber() +1;
    const newLaunch = await Object.assign(launch,{
        customers:['NOAA','NASA'],
        upcoming:true,
        success:true,
        flightNumber:latestFlightNumber,
    })

    await saveLaunches(newLaunch);
    //     latestFlightNumber++;
//     launches.set(latestFlightNumber,
//         Object.assign(launch,{
//             customers:['NOAA','NASA'],
//             upcoming:true,
//             success:true,
//             flightNumber:latestFlightNumber,
//         }));
}
async function abortLaunch(launchId){
    const aborted = await launchesDatabase.updateOne({
        flightNumber:launchId,
    },{
        success : false,
        upcoming: false,
    })
    
    return (aborted.acknowledged ===true && aborted.modifiedCount===1);
    // const aborted = launches.get(launchId);
    // aborted.success = false ;
    // aborted.upcoming = false;
    // return aborted
}


module.exports = {
    loadLaunchData,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    launchHasExist,
}