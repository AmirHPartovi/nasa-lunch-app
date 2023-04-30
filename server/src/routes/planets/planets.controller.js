const {getAllPlanet} = require('../../models/planets.model')

const httpGetAllPlanet =async(req,res)=>{
   return res.status(200).json(await getAllPlanet());
}

module.exports={
    httpGetAllPlanet,
}