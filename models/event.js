const mongoose = require('mongoose');
const db = require('../db')
const eventComments = require('../models/eventComment');
const Users = require('../models/user');

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);



const eventSchema = new mongoose.Schema({
    category :{
        type : Number,
        required:true,
    },
    title : {
        type : String,
        required: true,
        trim : true,
    },
    content :{
        type : String,
        required : true,
    },
    host:{
        type : mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    headCount :{
        type :Number,
        required: true,
    },
    scrapCount :{
        type : Number,
        required: true,
        default : 0
    },
    commentCount :{
        type : Number,
        required: true,
        default : 0
    },
    location :{
        type : String,
        required : true,
    },
    idx : {
        type: Number,
        default:0
    },
    time :{
        type : String,
        required : true,
    },
    image :{
        type : Number,
        required : true,
    },
    school :{
        type : Number,
        required:true,
    }
},
    {
        timestamps:true,
        versionKey: false,
        collection:'events'
});

eventSchema.plugin(autoIncrement.plugin,{
    model:'events',
    field:'idx',
    startAt:0,
    increment:1
});

eventSchema.index({"idx":1});


const Events = mongoose.model('events',eventSchema);

module.exports = Events