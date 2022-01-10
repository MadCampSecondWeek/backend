const mongoose = require('mongoose');
const db = require('../db')
const Comments = require('../models/comment');
const Users = require('../models/user');

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const postSchema = new mongoose.Schema({
    board:{
        type : mongoose.Types.ObjectId,
        ref : "boards",
        required : true        
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
    school :{
        type :  Number,
        required : true,
    },
    // author:{
    //     type:String,
    //     required:true,
    //     trim:true,
    // },
    author:{
        type : mongoose.Types.ObjectId,
        required:true,
        ref:'users'
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
    idx : {
        type: Number,
        default:0
    }

},
    {
        timestamps:true,
        versionKey: false,
        collection:'posts'
});

postSchema.plugin(autoIncrement.plugin,{
    model:'posts',
    field:'idx',
    startAt:0,
    increment:1
});

postSchema.index({"idx":1});
postSchema.virtual('comments',{
    ref : 'comments',
    localField:'_id',
    foreignField:'post',
})

const Posts = mongoose.model('posts',postSchema);

module.exports = Posts