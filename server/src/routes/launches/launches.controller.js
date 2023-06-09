const {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    launchHasExist,
} = require('../../models/launches.model')
const getPagination = require('../../services/query');

const httpGetAllLaunches =async (req,res)=>{
    const query = req.query;
    const {skip , limit} = getPagination(query);
    const launches = await getAllLaunches(skip,limit);
    return res.status(200).json(launches);
};
const httpAddNewLaunch =async(req,res)=>{
    const launch = req.body;
    console.log(launch)
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error:"Missing Required Data"
        });
    } 
    
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid Date Type"
        })
    }
       
    await scheduleNewLaunch(launch);
        return res.status(201).json(launch);

    ;

};

const httpAbortLaunch = async(req , res ) =>{
    const launchId = Number(req.params.id);
    const existLaunch = await launchHasExist(launchId);
    if(!existLaunch){
        return res.status(404).json({
            error:'launch does not exist'
        })
    }else{
        const abortedLaunch = await abortLaunch(launchId)
        if(!abortedLaunch){
            return res.status(400).json({
                error:'launch not aborted',
            })
        }
        return res.status(200).json({
            ok:true,
        });
    }
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}