const express = require('express');
const {getAllPlanet} = require('./planets.controller')
const planetsRouter =express.Router();

planetsRouter.get('/' , getAllPlanet);

module.exports= planetsRouter