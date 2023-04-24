const express = require('express');
const path = require('path')
const cors = require('cors')
const planetRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}))
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','static')))

app.use('/',(res,req)=>{
    res.sendFile(path.join(__dirname,'..','static','index.html'))
})
app.use('/planets', planetRouter)

module.exports = app