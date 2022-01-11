const { db } = require('../models/post');
const Posts = require('../models/post');
const Comments = require('../models/comment');
const Boards = require('../models/board');
const LikePost = require('../models/likePost');
const Events = require('../models/event');
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
        console.log(user.school);
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

        if (boards.length==0){
            const newboards =[];
            newboards.push(new Obj.Board("자유게시판",user.school));
            newboards.push(new Obj.Board("질문게시판",user.school));
            newboards.push(new Obj.Board("홍보게시판",user.school));
            newboards.push(new Obj.Board("정보게시판",user.school));
            newboards.push(new Obj.Board("동아리게시판",user.school));
            for (let newboard of newboards){
                await Boards.create(newboard);
            }
        }

        /* Hot Posts for home */
        const hotBoard = await postController.getHotPosts(true,user);
        const todayPopularBoard = await postController.getTodayPopularPosts(true,user);
       
        /* Events for home */
        // const events = await eventController.getAllEvent
        const eventBoard = await Events.find()
                                .select('title location content time headCount')
                                .sort({'idx':-1}).limit(5).lean();
        return JSON.stringify({boards,hotBoard,todayPopularBoard,eventBoard});

        // return JSON.stringify(events)

        // return JSON.stringify(boards);

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};



/* add board for devleoper */
boardController.boardWrite = async (title,school) =>{
    try{
        const newboard = new Obj.Board(title,school);
        
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