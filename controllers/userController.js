const Comments = require('../models/comment');
const Posts = require('../models/post');
const Users = require('../models/user');

const Obj = require('../prototype/Obj');

const userController = {};

// get all of the post from the board.
userController.getAllUser = async () =>{
    try {
        const users = await Users.find({}).limit().lean();
        return JSON.stringify(users)
        // res.status(200).send(JSON.stringify(posts));
        // console.log(JSON.parse(JSON.stringify([{_id : "1a2b4c5v",title:"안뇽",content:"배고파",likeCount : 999999, commnentCount :0 },
        // {_id : "1a2b4cs5v",title:"빵맛있다",content:"땡큐땡큐",likeCount : 999999, commentCount :0 },
        // {_id : "1a2b4c25v",title:"리액트장인",content:"윤예슬",likeCount : 999999, commentCount : 10000000000 }]))[0]);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

// postController.getOnePost = async (id) =>{
//     try{
//         const post = await Posts.find({"_id" : ObjectId(id)});
//         return JSON.stringify(post);

        
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }


/*after submit the writing content, add it to the db
 obj : {title,content,author}*/ 
userController.userWrite = async (school) =>{
    try{
        
        // obj= {title:"123",content:"456",author:"789"};

        const newUser = new Obj.User(school);
        
        const user = await Users.create(newUser);
        
        return JSON.stringify(user);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

// /* delete requset */
// postController.deleteOnePost = async (id) =>{
//     try{
//         const post = await Posts.deleteOne({"_id" : ObjectId(id)});
//         return JSON.stringify(post);
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }   
// }



module.exports = userController