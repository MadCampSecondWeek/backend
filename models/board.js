const mongoose = require('mongoose');
const db = require('../db')
const Comments = require('../models/comment');
const Users = require('../models/user');
const Posts = require('../models/post');

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const boardSchema = new mongoose.Schema({

    title : {
        type : String,
        required: true,
        trim : true,
    },
    school:{
        type: String,
        required : true
    },
    idx : {
        type: Number,
        default:0
    }

},
    {
        timestamps:true,
        versionKey: false,
        collection:'boards'
});

boardSchema.plugin(autoIncrement.plugin,{
    model:'posts',
    field:'idx',
    startAt:0,
    increment:1
});

boardSchema.index({"idx":1});
boardSchema.virtual('posts',{
    ref : 'posts',
    localField:'_id',
    foreignField:'post',
})

const Boards = mongoose.model('boards',boardSchema);

module.exports = Boards