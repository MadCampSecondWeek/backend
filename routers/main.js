const express = require('express');
const router = express.Router();

router.get('/',function(req,res){

   const obj1= {first:1, second:2, third:3};
   // const obj2 = delete obj1['second'];
   const obj2= (({ first, third }) => ({ first, third }))(obj1);

   console.dir(obj1);
   console.dir(obj2);
   
   res.send('Welcome!!!!');
});
router.get('/posts',function(req,res){
   res.send('This is post!');
});

module.exports=router


