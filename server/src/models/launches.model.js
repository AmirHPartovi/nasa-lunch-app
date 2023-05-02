const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo');

// const launches = new Map();

let DEFAULT_LATEST_FLIGHT_NUMBER = 100;



const launch ={
    flightNumber:100,
    mission:'kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 12 , 2035'),
    target: 'Kepler-442 b',
    customer:['NOAA','NASA'],
    upcoming:true,
    success:true,
};

// launches.set(launch.flightNumber,launch);
saveLaunches(launch)

async function launchHasExist (launchId){
    return await launchesDatabase.findOne({
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

async function getAllLaunches(){
    // return Array.from(launches.values())
    return await launchesDatabase
    .find({},{"_id":0,"__V":0,})
};

async function saveLaunches(launch){
    const planet = await planets.findOne({
        keplerName : launch.target,
    })
    if(!planet){
        throw new Error('target does not match to habitable planets')
    }

     await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    },
    launch,
    {
        upsert:true
    })
}

async function scheduleNewLaunch(launch){
    const latestFlightNumber =await getLatestFlightNumber() +1;
    const newLaunch = await Object.assign(launch,{
        customer:['NOAA','NASA'],
        upcoming:true,
        success:true,
        flightNumber:latestFlightNumber,
    })

    await saveLaunches(newLaunch);
    //     latestFlightNumber++;
//     launches.set(latestFlightNumber,
//         Object.assign(launch,{
//             customer:['NOAA','NASA'],
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
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    launchHasExist,
}