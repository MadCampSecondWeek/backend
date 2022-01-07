// const Comments = require('../models/comment')
// const ObjectId = require('mongoose').Types.ObjectId;

// const db_manager = {};


// // get all of the post from the board.
// db_manager.getAllPost = async () =>{
//     try {
//         const posts = await Posts.find({}).limit(10000).lean();
//         return JSON.stringify(posts)
//         // res.status(200).send(JSON.stringify(posts));
//         // console.log(JSON.parse(JSON.stringify([{_id : "1a2b4c5v",title:"안뇽",content:"배고파",likeCount : 999999, commnentCount :0 },
//         // {_id : "1a2b4cs5v",title:"빵맛있다",content:"땡큐땡큐",likeCount : 999999, commentCount :0 },
//         // {_id : "1a2b4c25v",title:"리액트장인",content:"윤예슬",likeCount : 999999, commentCount : 10000000000 }]))[0]);
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }
// };

// db_manager.getOnePost = async (id) =>{
//     try{
//         const post = await Posts.find({"_id" : ObjectId(id)});
//         return JSON.stringify(post);

        
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }


// /*after submit the writing content, add it to the db
//  obj : {title,content,writer}*/ 
// db_manager.postWrite = async (obj) =>{
//     try{
        
//         const {title,content,writer} = obj;
//         const post = await Posts.create({title,content,writer});
//         return JSON.stringify(post);
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }

// /* delete requset */
// db_manager.deleteOnePost = async (id) =>{
//     try{
//         const post = await Posts.deleteOne({"_id" : ObjectId(id)});
//         return JSON.stringify(post);
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }



// module.exports = db_manager