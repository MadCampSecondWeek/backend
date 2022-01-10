const { db } = require('../models/post');
const Posts = require('../models/post');
const Comments = require('../models/comment');
const LikePost = require('../models/likePost');
const ObjectId = require('mongoose').Types.ObjectId;
const Obj = require('../prototype/Obj');
const moment = require('moment');
const today = moment().startOf('day');


postController={};
// get all of the post from the board.
postController.getAllPost = async (boardid) =>{
    try {
        const posts = await Posts.find({board:ObjectId(boardid)}).sort({'idx':-1}).limit().lean();
        return JSON.stringify(posts)
        // res.status(200).send(JSON.stringify(posts));
        // console.log(JSON.parse(JSON.stringify([{_id : "1a2b4c5v",title:"안뇽",content:"배고파",likeCount : 999999, commnentCount :0 },
        // {_id : "1a2b4cs5v",title:"빵맛있다",content:"땡큐땡큐",likeCount : 999999, commentCount :0 },
        // {_id : "1a2b4c25v",title:"리액트장인",content:"윤예슬",likeCount : 999999, commentCount : 10000000000 }]))[0]);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

postController.getHotPosts = async (forHome,user) => {
    try{
        
        if (forHome){
            const posts = await Posts.find({$and : [{school:user.school},{likeCount : {"$gte":10}}]})
                .select("title content board likeCount commentCount createdAt")
                .sort({'idx':-1})
                .limit(5).lean().populate({path:'board',select:'title school'});
            return JSON.stringify(posts);
        }else{
            const posts = await Posts.find({$and: [{school:user.school},{likeCount : {"$gte":10}}]})
            .sort({'idx':-1})
            .limit().lean().populate({path:'board',select:'title'});
            return JSON.stringify(posts);
        }
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
}
postController.getTodayPopularPosts = async (forHome,user) => {
    try{
        if (forHome){
            const posts = await Posts.find({$and : [{school:user.school},
                {createdAt: {
                  $gte: today.toDate(),
                  $lte: moment(today).endOf('day').toDate()
                }}]})
                .select("title content board likeCount commentCount createdAt")
                .sort({'likeCount':-1})
                .limit(3).lean().populate({path:'board',select:'title'});
            return JSON.stringify(posts)
        }else{
            const posts = await Posts.find({$and : [{school:user.school},
                {createdAt: {
                  $gte: today.toDate(),
                  $lte: moment(today).endOf('day').toDate()
                }}]})
                .sort({'likeCount':-1}).limit().lean().populate({path:'board',select:'title'});
            return JSON.stringify(posts)
        }

        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
}

postController.getOnePost = async (postid,userid) =>{
    try{
        console.log("postid",postid);
        const post = await Posts.findOne({_id : ObjectId(postid)}).populate({path:'author',select:'idx'});
        const comments = await Comments.find({post:ObjectId(postid)}).sort('createdAt').populate({path:'author',select:'idx'});
        
        let isLiked = await LikePost.findOne({$and: [{user:ObjectId(userid)},{post:ObjectId(postid)}]});
        if (isLiked){
            isLiked = true;
        }else{
            isLiked = false;
        }
        /* Comment({content,author,post}) */

        return JSON.stringify({post,comments,isLiked});

        // const post = await Posts.find({"_id" : ObjectId(id)});
        // return JSON.stringify(post);

        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}


/*after submit the writing content, add it to the db
 obj : {title,content,author}*/ 
postController.postWrite = async (title,content,boardid,userid,school) =>{
    try{

        const newpost = new Obj.Post(title,content,boardid,userid,school);
        const post = await Posts.create(newpost);
        
        return JSON.stringify(post);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

/* delete requset 
    should delete comments as well*/
postController.deleteOnePost = async (postId,userId) =>{
    try{
        let post = await Posts.findOne({"_id" : ObjectId(postId)});
        // console.log(userId,post.author,typeof userId, typeof post.author);

        if (ObjectId(userId).equals(post.author)){
            post = await Posts.deleteOne({"_id" : ObjectId(postId)});
            const comments = await Comments.deleteMany({post:ObjectId(postId)});
            const likepost = await LikePost.deleteMany({post:ObjectId(postId)});
            return JSON.stringify({post,comments,likepost});
        }else{
            console.log("you can not remove the post");
            return JSON.stringify({errorCode:403,error:"forbbiden"});
        }

        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

postController.likePost = async (postid,userid) => {
    try{
        // let post = await Posts.findOne({"_id" : ObjectId(postid)});
        const isLiked = await LikePost.findOne({$and: [{user:ObjectId(userid)},{post:ObjectId(postid)}]});
        if (isLiked){
            await LikePost.findByIdAndDelete(isLiked);
            const post = await Posts.findOneAndUpdate({"_id" : ObjectId(postid)},{ $inc :{"likeCount":  -1}},{new:true});
            if (!post){/// null
                throw new Error("no corresponding post id");
            }
            return JSON.stringify(post);
        }else{
            await LikePost.create(new Obj.LikePostFunc(postid,userid))
            const post = await Posts.findOneAndUpdate({"_id" : ObjectId(postid)},{ $inc :{"likeCount":  1}},{new:true});
            if (!post){///null
                throw new Error("no corresponding post id");
            }
            return JSON.stringify(post);
            
        }
        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

module.exports = postController