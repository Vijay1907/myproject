
// sudo systemctl start mongod

const {MongoClient}= require('mongodb');
const dotenv= require('dotenv');
 dotenv.config({ path: __dirname + "/../.env" });

 const database =process.env.DATABASE
 const mongoPath ="mongodb://localhost:27017";
 let _db;
let mongoutil= {
    connectToServer: (cb)=>{
        MongoClient.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true }).
        then((client)=>{
           _db= client.db(database) 
             return cb()
        }).catch((err)=>{
            return cb(err)
        })
    },
    getDb: ()=>{
        return _db;
    }
}
 
module.exports= {mongoutil}