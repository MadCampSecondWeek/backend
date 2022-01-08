// /* This is the router code for the url under /board/~ */
const express = require('express');
const commentRouter = express.Router();
const Comments = require('../models/comment');
const queryOk = require('../public/queryOk');

const commentController = require('../controllers/commentController');





/* write submit */
const commentWriteRouter = async (req,res) =>{
//     const obj1= {first:1, second:2, third:3};
//    // const obj2 = delete obj1['second'];
//     const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1);
    
//     for (let i = 0 ; i<30 ; i++){
//         const result = await postController.postWrite({title:`${i}${i}`,content:`${i}content`,author:`0${i}`});
//         console.log(`hi${i}`);
//     }
        /* userid, postid */
        if (!queryOk([req.query.userid,req.query.postid])){
            res.status(400).send({errorCode:400,error:"no appropriate query request"});
        }else{
            const result = await commentController.commentWrite(req.query.userid,req.query.postid);

            if (result.hasOwnProperty("error")){
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
        }

        
};


// //delete a specific comment
const deleteOneCommentRouter = async (req,res)=>{
    const commentid = req.query.commentid
    if (!queryOk([commentid,req.query.userid])){
        res.status(400).send({errorCode:400,error:"no appropriate query request"});
    }else{
        const result = await commentController.deleteOneComment(commentid,req.query.userid)
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


// postRouter.get('/',getAllPostRouter); 
commentRouter.get('/',commentWriteRouter);
// postRouter.get('/post/:postid',getOnePostRouter);
commentRouter.delete('/',deleteOneCommentRouter);

module.exports= commentRouter;

