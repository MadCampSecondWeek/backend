/* This is the router code for the url under /board/~ */
const express = require('express');
const boardRouter = express.Router();
const Posts = require('../models/post');
const Boards = require('../models/board');
const postController = require('../controllers/postController');
const boardController = require('../controllers/boardController');
const queryOk = require('../public/queryOk');

/* Get all posts */
const getAllBoardRouter = async (req,res) =>{
    console.log(req.user);
    console.log(req.header);
    let result = await boardController.getAllBoard(req.user);
    if (result.hasOwnProperty("error")){
        console.log(result);
        return res.status(400).send(result);
    }
    return res.status(200).send(result);
};



/* write submit */
const boardWriteRouter = async (req,res) =>{

    const result = await boardController.boardWrite(req.body.title,req.user.school);       
            
            // const result = await boardController.postWrite("title","contnset",req.query.userid);
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }else{
        res.status(200).send(result);
    }
    
}


// //delete a specific post
// const deleteOneboardRouter = async (req,res)=>{
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
// boardRouter.put('/post/edit/:postid', getEditPost);
// boardRouter.post('/posrt/edit/:postid',postEditPost);

boardRouter.get('/',getAllBoardRouter); 
boardRouter.post('/add',boardWriteRouter);

// boardRouter.delete('/post',deleteOneboardRouter);

module.exports= boardRouter;

