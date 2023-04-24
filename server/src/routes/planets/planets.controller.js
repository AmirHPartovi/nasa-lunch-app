const {planets} = require('../../models/planets.model')

const getAllPlanet =(req,res)=>{
   return res.status(200).json(planets);
}

module.exports={
    getAllPlanet,
}