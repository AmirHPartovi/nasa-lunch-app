const express = require('express');
const {httpGetAllPlanet} = require('./planets.controller')
const planetsRouter =express.Router();

planetsRouter.get('/' , httpGetAllPlanet);

module.exports= planetsRouter