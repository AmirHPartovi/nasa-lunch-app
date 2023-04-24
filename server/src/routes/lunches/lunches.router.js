const express = require('express');
const {getAllLunches} = require('./lunches.controller');
const lunchesRouter = express.Router();

lunchesRouter.get('/',getAllLunches)

module.exports=lunchesRouter