
const posts = require('../models/post');
const getAllPost = async (req, res)=>{
    try{
        const posts = await posts.find({});
        console.log("this is posts");
        
    }catch (error){
        res.status(400).send({ error:error.message});
    }
}