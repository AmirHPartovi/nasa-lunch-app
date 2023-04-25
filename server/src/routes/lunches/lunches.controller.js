const {getAllLunches} = require('../../models/lunches.model')


const httpGetAllLunches = (req,res)=>{
    return res.status(200).json(getAllLunches)
}

module.exports={
    httpGetAllLunches,
}