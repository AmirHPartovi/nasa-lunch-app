const launches = new Map();

let latestFlightNumber = 100;

const launchHasExist = (launchId)=>{
   return launches.has(launchId);
}

const launch ={
    flightNumber:100,
    mission:'kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 12 , 2035'),
    target: 'kepler-442 b',
    customer:['NOAA','NASA'],
    upcoming:true,
    success:true,
};

launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
};

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,
        Object.assign(launch,{
            customer:['NOAA','NASA'],
            upcoming:true,
            success:true,
            flightNumber:latestFlightNumber,
        }));
    
};
const abortLaunch = (launchId)=>{
    const aborted = launches.get(launchId);
    aborted.success = false ;
    aborted.upcoming = false;
    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    launchHasExist,
}