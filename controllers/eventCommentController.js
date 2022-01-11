const EventComments = require('../models/eventComment');
const Events = require('../models/event');
const Users = require('../models/user');
const LikeComment = require('../models/likeComment');
const Obj = require('../prototype/Obj');
const ObjectId = require('mongoose').Types.ObjectId;

const eventCommentController = {};


/* get all of the comments from the post. */
eventCommentController.getAllEventComment = async (eventid,userid,apply) =>{
    try {
        // const evnt = await Events.findOne({_id:ObjectId(eventid)})
        let comments = await EventComments.find({$and : [{event : ObjectId(eventid)},{apply:apply}]}).sort('idx');
        
        const commentAuthors =[];
        comments = await Promise.all(comments.map( async (item) =>{
            let isLiked = await LikeComment.findOne({$and: [{user:ObjectId(userid)},{comment:ObjectId(item._id)}]});
                if (isLiked){
                    isLiked = true;
                }else{
                    isLiked = false;
                }
                //empty array -> false
                if (!commentAuthors.some(e=> {
                    
                    console.log(e.author._id,item.author.id);
                    console.log(e.author._id.equals(item.author._id));
                    if (e.author._id.equals(item.author._id)){
                        item._doc.displayNumber = e._doc.displayNumber
                        return true;
                    }
                })){
                    console.log(commentAuthors);
                    commentAuthors.push(item);
                    item._doc.displayNumber = commentAuthors.length
                }
                item._doc.isAuthor = ObjectId(userid).equals(item.author);
            return {comment : item,isLiked}
            })
        );
 
        return JSON.stringify(comments);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};



/*after submit the writing content, add it to the db
 obj : {title,content,writer}*/ 
eventCommentController.eventCommentWrite = async (content,eventid,userid,apply) =>{
    try{
        
        const event = await Events.findOneAndUpdate({"_id" : ObjectId(eventid)},{$inc : {"commentCount":+1}},{new:true});
        const comment = await EventComments.create(new Obj.EventComment(content,userid,eventid,apply));
        
        return JSON.stringify(comment);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

// /* delete requset */
eventCommentController.deleteOneEventComment = async (eventcommentid,userid) =>{
    try{
        let eventComment = await EventComments.findOne({"_id" : ObjectId(eventcommentid)});
        
        if (ObjectId(userid).equals(eventComment.author)){
            // const commentCount = comment.post.commentCount -1;
            // post = await Posts.findOneAndUpdate({"_id" : comment.post._id},{"commentCount":commentCount},{new:true});
            const event = await Events.findOneAndUpdate({"_id" : eventComment.event},{$inc : {"commentCount":-1}},{new:true});
            let eventcomment = await EventComments.deleteOne({"_id" : ObjectId(eventcommentid)});
            console.log(eventcomment);
            await LikeComment.deleteMany({comment:ObjectId(commentId)});
            return JSON.stringify(eventcomment);
        }else{
            console.log("you can not remove the post");
            return JSON.stringify({errorCode:403,error:"forbbiden"});
        }

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

eventCommentController.likeComment = async (commentid,userid) => {
    try{
        // let comment = await Comments.findOne({"_id" : ObjectId(commentid)});
        const isLiked = await LikeComment.findOne({$and: [{user:ObjectId(userid)},{comment:ObjectId(commentid)}]});
        if (isLiked){
            await LikeComment.findByIdAndDelete(isLiked);
            const comment = await EventComments.findOneAndUpdate({"_id" : ObjectId(commentid)},{ $inc :{"likeCount":  -1}},{new:true});
            if (!comment){/// null
                throw new Error("no corresponding comment id");
            }
            return JSON.stringify(comment);
        }else{
            await LikeComment.create(new Obj.LikeCommentFunc(commentid,userid))
            const comment = await EventComments.findOneAndUpdate({"_id" : ObjectId(commentid)},{ $inc :{"likeCount":  1}},{new:true});
            if (!comment){///null
                throw new Error("no corresponding comment id");
            }
            return JSON.stringify(comment);
            
        }
        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

module.exports = eventCommentController