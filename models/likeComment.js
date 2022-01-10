const mongoose = require('mongoose');
const db = require('../db')
const ObjectId = mongoose.Types.ObjectId;

const Users = require('../models/user');
const Comments = require('../models/comment');



const likeCommentSchema = new mongoose.Schema({

    user:{
        type : mongoose.Types.ObjectId,
        ref:"users",
        required : true
    },
    // author:{type:String, required: true},
    comment:{
        type : ObjectId,
        ref : "comments",
        required : true        
    },
},
    {

        versionKey: false,
        collection:'likecomment'
});


const LikeComment = mongoose.model('likecomment',likePostSchema);
module.exports = LikeComment