const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const lunchesRouter = require('./routes/lunches/lunches.router');

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','static')))


app.use('/planets', planetsRouter);
app.use('/lunches', lunchesRouter);
app.get('/',(res,req)=>{
    res.sendFile(path.join(__dirname,'..','static','index.html'))
})

module.exports = app