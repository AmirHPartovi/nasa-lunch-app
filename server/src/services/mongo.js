const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGODB_NASA_API;

mongoose.connection.once('open',()=>{
    console.log('mongoDB connection is ready ...');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}
async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect,
}