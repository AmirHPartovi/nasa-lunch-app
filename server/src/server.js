const http = require('http');
const app = require('./app');
const mongoose = require('mongoose')
// const os = require('os');
// const cluster = require('cluster')

const {loadPlanetData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:NTy526QofpViK0bK@nasa-cluster.ncrr8tz.mongodb.net/?retryWrites=true&w=majority'

const server =http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('mongoDB connection is ready ...');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})

async function startServer(){
    await mongoose.connect(MONGO_URL)
    await loadPlanetData();
    // await mongoose.connect(MONGO_URL,,{
    //     useNewUrlParser : true ,
    //     useFindAndModify : false ,
    //     useCreateIndex : true ,
    //     useUnifiedTypology:true,
    // })
    
    server.listen(PORT , ()=>{
        console.log(`server listening on port ${PORT}...`);
    });
}

startServer()



// const numberOfCore = os.cpus().length;


// if(cluster.isMaster){
//     console.log('master has been started ...');
//     for(let i=0 ; i < numberOfCore ; i++){
//         cluster.fork()
//     }
// }else{
//     console.log('worker process started...');
//     async function startServer(){
//         await loadPlanetData();
        
//         server.listen(PORT , ()=>{
//             console.log(`server listening on port ${PORT}...`);
//         });
//     }
    
//     startServer()
// }



