// /* This is the router code for the url under /board/~ */
const express = require('express');
const eventCommentRouter = express.Router();
const Comments = require('../models/comment');
const queryOk = require('../public/queryOk');

const eventCommentController = require('../controllers/commentController');



const getAllEventCommentRouter = async(req,res) =>{
    if (!queryOk([req.query.eventid,req.query.apply])){
            const result = {errorCode:400,error:"no appropriate query request"}
            console.log(result);
            res.status(400).send(result);
    }else{
        const result = await eventCommentController.getALleventComment(req.query.eventid,req.query.apply);
    }
};

/* write submit */
const eventCommentWriteRouter = async (req,res) =>{
        /* userid, postid */
        const {eventid,userid,apply} =req.query
        if (!queryOk([eventid,userid,apply])){
            const result = {errorCode:400,error:"no appropriate query request"}
            console.log(result);
            res.status(400).send(result);
        }else{
            const result = await commentController.eventCommentWrite(req.body.content,eventid,userid,apply);
            if (result.hasOwnProperty("error")){
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
        }

        
};


// //delete a specific comment
const deleteOneEventCommentRouter = async (req,res)=>{
    const {commentid,userid} = req.query
    if (!queryOk([commentid,userid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await commentController.deleteOneComment(commentid,userid)
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
eventCommentRouter.get('/',eventCommentWriteRouter);
// postRouter.get('/post/:postid',getOnePostRouter);
eventCommentRouter.delete('/',deleteOneEventCommentRouter);

module.exports= eventCommentRouter;