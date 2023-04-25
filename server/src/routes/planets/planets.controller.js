const {getAllPlanet} = require('../../models/planets.model')

const httpGetAllPlanet =(req,res)=>{
   return res.status(200).json(getAllPlanet());
}

module.exports={
    httpGetAllPlanet,
}