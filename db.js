const mongoose = require('mongoose')



require('dotenv').config();

mongoose.connect(
    "mongodb://localhost:27017/community_db",{
    useNewUrlParser: true,
    // useFindAndModify : false,
    useUnifiedTopology: true,
});
const db1 = mongoose.connection;

// can mangage multiple db by createConnection rather than code commented above
// const db1 = mongoose.createConnection("mongodb://localhost:27017/community_db");
// const db2 = mongoose.createConnection("mongodb://localhost:27017/community_db");

const handleConnection = () =>{
    console.log('DB is Connected!');
}

const handleError = (err)=>{
    console.log(`Error on DB: ${err}`);
};

db1.once('open',handleConnection);
db1.on('error',handleError);

module.exports =  db1