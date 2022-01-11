// /* This is the router code for the url under /board/~ */
const express = require('express');
const eventCommentRouter = express.Router();
const Comments = require('../models/comment');
const queryOk = require('../public/queryOk');

const eventCommentController = require('../controllers/eventCommentController');
const commentController = require('../controllers/commentController');



const getAllEventCommentRouter = async(req,res) =>{
    if (!queryOk([req.query.eventid,req.query.apply])){
            const result = {errorCode:400,error:"no appropriate query request"}
            console.log(result);
            return res.status(400).send(result);
    }else{
        const result = await eventCommentController.getAllEventComment(req.query.eventid,req.user._id,req.query.apply);
        console.log(result);
        return res.status(200).send(result);
        
    }
};

/* write submit */
const eventCommentWriteRouter = async (req,res) =>{
        /* userid, postid */
        const {eventid,apply} =req.query
        if (!queryOk([eventid,apply])){
            const result = {errorCode:400,error:"no appropriate query request"}

            res.status(400).send(result);
        }else{
            const result = await eventCommentController.eventCommentWrite(req.body.content,eventid,req.user._id,apply);
            if (result.hasOwnProperty("error")){
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
        }

        
};


// //delete a specific comment
const deleteOneEventCommentRouter = async (req,res)=>{
    const {commentid} = req.query
    if (!queryOk([commentid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventCommentController.deleteOneEventComment(commentid,req.user._id);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}
const likeEventCommentRouter = async (req,res)=>{
    if (!queryOk( [req.query.commentid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventCommentController.likeComment(req.query.commentid,req.user._id);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}


// // //editing page
// // postRouter.put('/post/edit/:postid', getEditPost);
// // postRouter.post('/posrt/edit/:postid',postEditPost);


eventCommentRouter.get('/',getAllEventCommentRouter); 
eventCommentRouter.post('/',eventCommentWriteRouter);
eventCommentRouter.get('/like',likeEventCommentRouter);
// postRouter.get('/post/:postid',getOnePostRouter);
eventCommentRouter.delete('/',deleteOneEventCommentRouter);

module.exports= eventCommentRouter;