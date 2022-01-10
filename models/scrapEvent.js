const mongoose = require('mongoose');
const db = require('../db')
const ObjectId = mongoose.Types.ObjectId;



const scrapEventSchema = new mongoose.Schema({
    event:{
        type : ObjectId,
        ref : "events",
        required : true        
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref:"users",
        required : true
    },
    // author:{type:String, required: true},
    
},
    {
        versionKey: false,
        collection:'scrapevent'
});


const ScrapEvent = mongoose.model('scrapevent',scrapEventSchema);
module.exports = ScrapEvent