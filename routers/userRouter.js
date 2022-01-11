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

    let i=17

    const result = await userController.userWrite(i);

    if (result.hasOwnProperty("error")){
        res.status(400).send(result);
    }
    res.status(200).send(result);
}


const setSchoolRouter = async (req,res)=>{
    const school = req.body.school;
    const result = await Users.updateOneById(user._id,{$set:{school}});
    return res.status(200).send(result);
}



module.exports = userRouter;


// //editing page
// postRouter.put('/post/edit/:postId', getEditPost);
// postRouter.post('/posrt/edit/:postId',postEditPost);

userRouter.post('/school',setSchoolRouter);
userRouter.get('/',getAllUserRouter); 
userRouter.get('/add',userWriteRouter);
// postRouter.get('/post/:postId',getOnePostRouter);
// postRouter.delete('/delete/:postId',deleteOnePostRouter);

module.exports= userRouter;

