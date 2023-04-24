const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const planetRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','static')))


app.use('/planets', planetRouter);
app.use('/',(res,req)=>{
    res.sendFile(path.join(__dirname,'..','static','index.html'))
})

module.exports = app