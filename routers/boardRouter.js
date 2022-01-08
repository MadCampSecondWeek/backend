/* This is the router code for the url under /board/~ */
const express = require('express');
const postRouter = express.Router();
const Posts = require('../models/post');
const Boards = require('../models/board');
const postController = require('../controllers/postController');
const boardController = require('../controllers/boardController');
const queryOk = require('../public/queryOk');

/* Get all posts */
const getAllBoardRouter = async (req,res) =>{

    let result = await boardController.getAllBoard();
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
};



/* write submit */
const boardWriteRouter = async (req,res) =>{
/*     const obj1= {first:1, second:2, third:3};
       const obj2 = delete obj1['second'];
       const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1); */
    if (!queryOk([req.query.title,req.query.school])){
            res.status(400).send({errorCode:400,error:"no appropriate query request"});
    }else{
            console.log("req.body",req.body,typeof req.body);

            const result = await boardController.boardWrite(req.query.title,req.query.school);
            
            
            // const result = await boardController.postWrite("title","contnset",req.query.userid);

            if (result.hasOwnProperty("error")){
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
    }
}


// //delete a specific post
// const deleteOnePostRouter = async (req,res)=>{
//     const postid = req.query.postid
//     if (!queryOk([postid, req.query.userid])){
//         res.status(400).send({errorCode:400,error:"no appropriate query request"});
//     }else{
//         const result = await boardController.deleteOnePost(postid,req.query.userid)
//         if (result.hasOwnProperty("error")){
//             res.status(400).send(result);
//         }else{
//             res.status(200).send(result);
//         }
//     }

// }



// //editing page
// postRouter.put('/post/edit/:postid', getEditPost);
// postRouter.post('/posrt/edit/:postid',postEditPost);


postRouter.get('/',getAllBoardRouter); 
postRouter.get('/add',boardWriteRouter);

// postRouter.delete('/post',deleteOnePostRouter);

module.exports= postRouter;

