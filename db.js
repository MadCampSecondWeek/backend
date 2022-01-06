const mongoose = require('mongoose')

require('dotenv').config();

mongoose.connect(
    "mongodb://localhost:27017/myDB",{
    useNewUrlParser: true,
    useFindAndModify : false,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleConnection = () =>{
    console.log('DB is Connected!');
}

const handleError = (err)=>{
    console.log(`Error on DB: ${err}`);
};

db.once('open',handleConnection);
db.on('error',handleError);
