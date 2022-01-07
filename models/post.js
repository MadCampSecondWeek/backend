const mongoose = require('mongoose');
const db = require('../db')

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        trim : true,
    },
    content :{
        type : String,
        required : true,
    },
    writer:{
        type:String,
        required:true,
        trim:true,
    },
    likeCount :{
        type : Number,
        required: true,
        default : 0
    },
    commentCount :{
        type : Number,
        required: true,
        default : 0
    },

},
    {
        timestamps:true,
        versionKey: false,
        collection:'posts'
});

postSchema.index({"createdAt":1});
const Posts = mongoose.model('posts',postSchema);

module.exports = Posts