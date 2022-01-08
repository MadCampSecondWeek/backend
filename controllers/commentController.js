const Comments = require('../models/comment');
const Posts = require('../models/post');
const Users = require('../models/user');

const Obj = require('../prototype/Obj');
const ObjectId = require('mongoose').Types.ObjectId;

const controller = {};


/* get all of the comments from the post. */
// controller.getAllComment = async (postid) =>{
//     try {
//         const post = await Posts.findOne({_id:ObjectId(postid)}).populate({path:'author',select:'idx'});
//         const comments = await Comments.find({post:ObjectId(postid)}).sort('createdAt').populate({path:'author',select:'idx'});
//         return JSON.stringfy({post,comments});
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }
// };

// controller.getOnePost = async (id) =>{
//     try{
//         const post = await Posts.find({"_id" : ObjectId(id)});
//         return JSON.stringify(post);

        
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }


/*after submit the writing content, add it to the db
 obj : {title,content,writer}*/ 
controller.commentWrite = async (userId,postid) =>{
    try{
        // let post = await Posts.findOne({"_id" : ObjectId(postid)});
        // const commentCount =post.commentCount + 1;]
        console.log("123");
        const post = await Posts.findOneAndUpdate({"_id" : ObjectId(postid)},{$inc : {"commentCount":+1}},{new:true});
        const comment = await Comments.create(new Obj.Comment("this is content",userId,postid));

        return JSON.stringify(comment);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

// /* delete requset */
controller.deleteOneComment = async (commentId,userId) =>{
    try{
        let comment = await Comments.findOne({"_id" : ObjectId(commentId)}).populate([{path:"post",select:"commentCount"}]);
        if (ObjectId(userId).equals(comment.author)){
            const commentCount = comment.post.commentCount -1;
            // console.log("this is count", commentCount);
            post = await Posts.findOneAndUpdate({"_id" : comment.post._id},{"commentCount":commentCount},{new:true});
            // console.log("this is post", post);
            comment = await Comments.deleteOne({"_id" : ObjectId(commentId)});
            return JSON.stringify(comment);

        }else{
            console.log("you can not remove the post");
            return JSON.stringify({errorCode:403,error:"forbbiden"});
        }

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}



module.exports = controller