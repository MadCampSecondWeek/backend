const EventComments = require('../models/eventComment');
const Events = require('../models/event');
const Users = require('../models/user');

const Obj = require('../prototype/Obj');
const ObjectId = require('mongoose').Types.ObjectId;

const eventCommentController = {};


/* get all of the comments from the post. */
eventCommentController.getAllEventComment = async (eventid,apply) =>{
    try {
        // const evnt = await Events.findOne({_id:ObjectId(eventid)})
        const comments = await EventComments.find({$and : [{_id : ObjectId(eventid)},{apply:apply}]},'author content event').sort('idx');
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
            const event = await Posts.findOneAndUpdate({"_id" : eventComment.event},{$inc : {"commentCount":-1}},{new:true});
            eventcomment = await Comments.deleteOne({"_id" : ObjectId(eventcommentId)});
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



module.exports = eventCommentController