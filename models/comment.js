// const mongoose = require('mongoose');
// const db = require('../db')

// const commentSchema = new mongoose.Schema({
//     content :{
//         type : String,
//         required : true,
//     },
//     // author:{
//     //     type:mongoose.Types.ObjecID,
//     //     ref:"user"
//     // },
//     author:{type:String, required: true},
//     post:{
//         type : mongoose.Types.ObjectId,
//         ref : "posts",
//         required : true        
//     },
//     likeCount :{
//         type : Number,
//         required: true,
//         default : 0.
//     },
// },
//     {
//         timestamps:true,
//         collection:'comments'
// });

// const Comments = mongoose.model('comments',postSchema);
// module.exports = Comments