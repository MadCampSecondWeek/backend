const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
   console.log(req.body);
   res.send('Welcome!!!!');
});
router.get('/posts',function(req,res){
   res.send('This is post!');
});

module.exports=router


