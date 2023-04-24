const lunches = new Map();

const lunch ={
    flightNumber:100,
    mission:'kepler Exploration X',
    rocket:'Explorer IS1',
    lunchDate: new Date('December 12 , 2035'),
    target: 'kepler-442 b',
    customer:['NOVA','NASA'],
    upcoming:true,
    success:true,
};

lunches.set(lunch.flightNumber,lunch);

module.exports = {lunches}