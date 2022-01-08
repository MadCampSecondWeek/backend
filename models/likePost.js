const mongoose = require('mongoose');
const db = require('../db')
const ObjectId = mongoose.Types.ObjectId;

const Users = require('../models/user');
const Posts = require('../models/post');



const likePostSchema = new mongoose.Schema({

    user:{
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
},
    {
        timestamps:true,
        versionKey: false,
        collection:'likepost'
});


const LikePost = mongoose.model('likepost',likePostSchema);
module.exports = LikePost