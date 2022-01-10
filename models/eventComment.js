const mongoose = require('mongoose');
const db = require('../db')
const ObjectId = mongoose.Types.ObjectId;

const Users = require('../models/user');
const Events= require('../models/event');



const eventCommentSchema = new mongoose.Schema({
    apply : {
        type: Number,
        required : true,
    },
    author:{
        type : mongoose.Types.ObjectId,
        ref:"users",
        required : true
    },
    content :{
        type : String,
        required : true,
    },
    
    // author:{type:String, required: true},
    event:{
        type : ObjectId,
        ref : "events",
        required : true        
    },
},
    {
        timestamps:true,
        versionKey: false,
        collection:'eventcomments'
});


const EventComments = mongoose.model('eventcomments',eventCommentSchema);
module.exports = EventComments