const mongoose = require('mongoose');
const db = require('../db')
const ObjectId = mongoose.Types.ObjectId;

const Users = require('../models/user');
const Posts = require('../models/post');



const commentSchema = new mongoose.Schema({
    content :{
        type : String,
        required : true,
    },
    author:{
        type : mongoose.Types.ObjectId,
        ref:"users",
        required : true
    },
    // author:{type:String, required: true},
    post:{
        type : ObjectId,
        ref : "posts",
        required : true        
    },
    likeCount :{
        type : Number,
        required: true,
        default : 0.
    },
},
    {
        timestamps:true,
        collection:'comments'
});


const Comments = mongoose.model('comments',commentSchema);
module.exports = Comments