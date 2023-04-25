const express = require('express');
const {httpGetAllLunches} = require('./lunches.controller');
const lunchesRouter = express.Router();

lunchesRouter.get('/',httpGetAllLunches)

module.exports=lunchesRouter