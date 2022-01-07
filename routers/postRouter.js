/* This is the router code for the url under /board/~ */
const express = require('express');
const postRouter = express.Router();
const Posts = require('../models/post');
const postDataManager = require('../DAO/postDataManager');


/* Get all posts */
const getAllPostRouter = async (req,res) =>{
    const result = await postDataManager.getAllPost();
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
};

// //get a specific post
const getOnePostRouter = async (req,res) =>{
    const postId = req.params.postId
    console.log("id",postId);
    const result = await postDataManager.getOnePost(postId);
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
}

/* write submit */
const postWriteRouter = async (req,res) =>{
//     const obj1= {first:1, second:2, third:3};
//    // const obj2 = delete obj1['second'];
//     const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1);
    for (let i = 0 ; i<100 ; i++){
        const result = await postDataManager.postWrite({title:`${i}${i}`,content:`${i}content`,writer:`0${i}`});
        console.log(`hi${i}`)
    }
    const result = await postDataManager.postWrite({title:"555",content:"5content",writer:"05"});
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
}


// //delete a specific post
const deleteOnePostRouter = async (req,res)=>{
    const postId = req.params.postId
    console.log("id",postId)
    const result = await postDataManager.deleteOnePost(postId)
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
}


// //editing page
// postRouter.put('/post/edit/:postId', getEditPost);
// postRouter.post('/posrt/edit/:postId',postEditPost);


postRouter.get('/',getAllPostRouter); 
postRouter.get('/post',postWriteRouter);
postRouter.get('/post/:postId',getOnePostRouter);
postRouter.get('/delete/:postId',deleteOnePostRouter);

module.exports= postRouter;

