/* This is the router code for the url under /board/~ */
const express = require('express');
const postRouter = express.Router();
const Posts = require('../models/post');
const postController = require('../controllers/postController');
const queryOk = require('../public/queryOk');

/* Get all posts */
const getAllPostRouter = async (req,res) =>{

    if (!queryOk([req.query.boardid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await postController.getAllPost(req.query.boardid);
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }
        else res.status(200).send(result);
    }
};

// //get a specific post
const getOnePostRouter = async (req,res) =>{
    if (!queryOk([req.query.postid,req.query.userid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await postController.getOnePost(req.query.postid,req.query.userid);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}

/* write submit */
const postWriteRouter = async (req,res) =>{
/*     const obj1= {first:1, second:2, third:3};
       const obj2 = delete obj1['second'];
       const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1); */
    if (!queryOk([req.query.boardid,req.query.userid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
            // for (let i = 0 ; i<10 ; i++){
            //     const result = await postController.postWrite(`${i}${i}`,`${i}content`,req.query.userid);
            //     console.log(`hi${i}`);
            // }
            // i = 1
            // const result = await postController.postWrite(`${i}${i}`,`${i}content`,req.query.userid);

            // const result = await postController.postWrite(req.body.title,req.body.content,req.query.userid);
            
            
            const result = await postController.postWrite("secret2","contnset",req.query.boardid,req.query.userid);

            if (result.hasOwnProperty("error")){
                console.log(result);
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
    }
}


// //delete a specific post
const deleteOnePostRouter = async (req,res)=>{
    const postid = req.query.postid
    if (!queryOk([postid, req.query.userid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await postController.deleteOnePost(postid,req.query.userid)
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }

}

const likePostRouter = async (req,res)=>{
    if (!queryOk([req.query.userid , req.query.postid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await postController.likePost(req.query.postid,req.query.userid);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}


// //editing page
// postRouter.put('/post/edit/:postid', getEditPost);
// postRouter.post('/posrt/edit/:postid',postEditPost);


postRouter.get('/',getAllPostRouter); 
postRouter.post('/post',postWriteRouter);
postRouter.get('/post',getOnePostRouter);
postRouter.delete('/post',deleteOnePostRouter);
postRouter.get('/post/like',likePostRouter);
module.exports= postRouter;

