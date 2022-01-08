/* This is the router code for the url under /board/~ */
const express = require('express');
const userRouter = express.Router();
const Users = require('../models/user');
const userController = require('../controllers/userController');


// /* Get all users */
const getAllUserRouter = async (req,res) =>{
    const result = await userController.getAllUser() ;
    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
};

// // //get a specific post
// const getOnePostRouter = async (req,res) =>{
//     const postId = req.params.postId
//     console.log("id",postId);
//     const result = await postController.getOnePost(postId);
//     if (result.hasOwnProperty("error")){
//         res.status(400).send(result);
//     }
//     res.status(200).send(result);
// }

/* write submit */
const userWriteRouter = async (req,res) =>{

    let i=12

    const result = await userController.userWrite(i);

    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
}


// //delete a specific post
// const deleteOnePostRouter = async (req,res)=>{
//     const postId = req.params.postId
//     console.log("id",postId)
//     const result = await postController.deleteOnePost(postId)
//     if (result.hasOwnProperty("error")){
//         res.status(400).send(result);
//     }
//     res.status(200).send(result);
// }


// //editing page
// postRouter.put('/post/edit/:postId', getEditPost);
// postRouter.post('/posrt/edit/:postId',postEditPost);


userRouter.get('/',getAllUserRouter); 
userRouter.get('/add',userWriteRouter);
// postRouter.get('/post/:postId',getOnePostRouter);
// postRouter.delete('/delete/:postId',deleteOnePostRouter);

module.exports= userRouter;

