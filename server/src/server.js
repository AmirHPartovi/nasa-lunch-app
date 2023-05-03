const http = require('http');
const app = require('./app');
const {mongoConnect} = require('./services/mongo')
// const os = require('os');
// const cluster = require('cluster')

const {loadPlanetData} = require('./models/planets.model')
const{loadLaunchData} = require('./models/launches.model')

const PORT = process.env.PORT || 8000;


const server =http.createServer(app);


async function startServer(){
    await mongoConnect()
    await loadPlanetData();
    await loadLaunchData()
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



