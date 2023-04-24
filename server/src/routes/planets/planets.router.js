const express = require('express');
const {getAllPlanet} = require('./planets.controller')
const planetRouter =express.Router();

planetRouter.get('/' , getAllPlanet);

module.exports= planetRouter