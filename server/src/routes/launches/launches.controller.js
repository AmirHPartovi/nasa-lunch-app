const {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    launchHasExist,
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

};

const httpAbortLaunch = (req , res ) =>{
    const launchId = Number(req.params.id);
    if(!launchHasExist(launchId)){
        return res.status(404).json({
            error:'launch does not exist'
        })
    }else{
        return res.status(200).json(abortLaunch(launchId));
    }
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}