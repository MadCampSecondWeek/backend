const { db } = require('../models/post');
const Posts = require('../models/post');
const Comments = require('../models/comment');
const Boards = require('../models/board');
const LikePost = require('../models/likePost');
const ObjectId = require('mongoose').Types.ObjectId;
const Obj = require('../prototype/Obj');

const postController = require('./postController');
// const eventController = require("./eventController");

const boardController = {};


/* get all of the post from the board.
   + Hot Posts / today-popular Posts */
boardController.getAllBoard = async (user) =>{
    try {
        // getAllBoard
        const boards = await Boards.find({school:user.school}).limit(20).lean();

        // const boards = await Boards.find({}).limit(20).lean();
        for (let board of boards){
            let recentPost = await Posts.find({board:board}).sort({idx:-1}).limit(1).lean();
            recentPost = recentPost[0];
            let title ="";
            if (typeof recentPost === 'undefined'){
                title = "작성된 글이 없습니다."
            }else{ title = recentPost.title;}
            board.recentPost = title
        }

        /* Hot Posts for home */
        const hotBoard = await postController.getHotPosts(true,user);
        const todayPopularBoard = await postController.getTodayPopularPosts(true,user);
        return JSON.stringify({boards,hotBoard,todayPopularBoard});
        // return JSON.stringify(boards);

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};



/* add board for devleoper */
boardController.boardWrite = async (title,school) =>{
    try{
        const newboard = new Obj.Board(title,Number(school));
        
        const board = await Boards.create(newboard);
        
        return JSON.stringify(board);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

/* delete requset 
    should delete comments as well*/
// postController.deleteOnePost = async (postId,userId) =>{
//     try{
//         let post = await Posts.findOne({"_id" : ObjectId(postId)});
//         // console.log(userId,post.author,typeof userId, typeof post.author);
//         if (ObjectId(userId).equals(post.author)){
//             post = await Posts.deleteOne({"_id" : ObjectId(postId)});
//             const comments = await Comments.deleteMany({post:ObjectId(postId)});
//             const likepost = await LikePost.deleteMany({post:ObjectId(postId)});
//             return JSON.stringify({post,comments,likepost});
//         }else{
//             console.log("you can not remove the post");
//             return JSON.stringify({errorCode:403,error:"forbbiden"});
//         }

        
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }

module.exports = boardController