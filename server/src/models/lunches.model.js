const lunches = new Map();

let latestFlightNumber = 100;

const lunch ={
    flightNumber:100,
    mission:'kepler Exploration X',
    rocket:'Explorer IS1',
    lunchDate: new Date('December 12 , 2035'),
    target: 'kepler-442 b',
    customer:['NOAA','NASA'],
    upcoming:true,
    success:true,
};

lunches.set(lunch.flightNumber,lunch);

function getAllLunches(){
    return Array.from(lunches.values());
};

function addNewLunch(lunch){
    latestFlightNumber++;
    lunches.set(latestFlightNumber,
        Object.assign(lunch,{
            customer:['NOAA','NASA'],
            upcoming:true,
            success:true,
            flightNumber:latestFlightNumber,
        }));
    return lunch;
};

module.exports = {
    getAllLunches,
    addNewLunch,
}