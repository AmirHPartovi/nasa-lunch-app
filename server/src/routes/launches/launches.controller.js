const {
    getAllLaunches,
    addNewLaunch,
} = require('../../models/launches.model')


const httpGetAllLaunches = (req,res)=>{
    return res.status(200).json(getAllLaunches())
};
const httpAddNewLaunch =(req,res)=>{
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    console.log(launch)
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error:"Missing Required Data"
        });
    }else if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid Date Type"
        })
    }else{
        addNewLaunch(launch);
        return res.status(201).json(launch);

    };

}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
}