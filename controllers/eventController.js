const Events = require('../models/event');
const EventComments = require('../models/eventComment');
const ScrapEvent = require('../models/scrapEvent');
const ObjectId = require('mongoose').Types.ObjectId;
const Obj = require('../prototype/Obj');
const moment = require('moment');
const today = moment().startOf('day');


eventController={};
// get all of the post from the board.
eventController.getAllEvent = async (category) =>{
    try {
        if (Number(category)===0){
            const events = await Events.find({}).sort({'idx':-1}).limit().lean();
            return JSON.stringify(events)
        }else{
            const events = await Events.find({category:category}).sort({'idx':-1}).limit().lean();
            return JSON.stringify(events)
        }
        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

eventController.getScrappedEvents = async (userid) => {
    try{
        const scrappedEvents = await ScrapEvent.find({user:ObjectId(userid)},'event').populate({path:'event'});
        return JSON.stringify(scrappedEvents.map(item=>item.event));
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
}
// postController.getTodayPopularPosts = async (somequery) => {
//     try{
//         if (somequery){
//             const posts = await Posts.find({
//                 createdAt: {
//                   $gte: today.toDate(),
//                   $lte: moment(today).endOf('day').toDate()
//                 }}).sort({'likeCount':-1}).limit(10).lean().populate({path:'board',select:'title'});
//             return JSON.stringify(posts)
//         }else{
//             const posts = await Posts.find({
//                 createdAt: {
//                   $gte: today.toDate(),
//                   $lte: moment(today).endOf('day').toDate()
//                 }}).sort({'likeCount':-1}).limit().lean().populate({path:'board',select:'title'});
//             return JSON.stringify(posts)
//         }
    
//     }catch(error){
//         console.error(error);
//         return JSON.stringify({errorCode:400,error:error.message});
//     }
// }

eventController.getOneEvent = async (eventid,userid) =>{
    try{


        const event = await Events.findOne({_id : ObjectId(eventid)});



        let isScrapped = await ScrapEvent.findOne({$and: [{user:userid},{event:ObjectId(eventid)}]});
        if (isScrapped){
            isScrapped = true;
        }else{
            isScrapped = false;
        }
        /* Comment({content,author,post}) */

        // return JSON.stringify({event,comments,isScrapped});
        return JSON.stringify({event,isScrapped});
        // const post = await Posts.find({"_id" : ObjectId(id)});
        // return JSON.stringify(post);
        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}


/*after submit the writing content, add it to the db
 obj : {title,content,author}*/ 
eventController.eventWrite = async (category,title,content,userid,headCount,location,time,school) =>{
    try{
        const newEvent = new Obj.Event(category,title,content,userid,headCount,location,time,school);
        const event = await Events.create(newEvent);
        return JSON.stringify(event);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

/* delete requset 
    should delete comments as well*/
eventController.deleteOneEvent = async (eventId,userId) =>{
    try{
        let event = await Events.findOne({"_id" : ObjectId(eventId)});
        // console.log(userId,post.author,typeof userId, typeof post.author);
        if (ObjectId(userId).equals(event.author)){
            event = await Events.deleteOne({"_id" : ObjectId(eventId)});
            const eventcomments = await EventComments.deleteMany({event:ObjectId(eventId)});
            const scrapevent = await scrapevent.deleteMany({event:ObjectId(eventId)});
            return JSON.stringify({event,eventcomments,scrapevent});
        }else{
            console.log("you can not remove the post");
            return JSON.stringify({errorCode:403,error:"forbbiden"});
        }

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

eventController.scrapEvent = async (eventid,userid) => {
    try{
        // let post = await Posts.findOne({"_id" : ObjectId(postid)});
        const isScrapped = await ScrapEvent.findOne({$and: [{user:ObjectId(userid)},{event:ObjectId(eventid)}]});
        if (isScrapped){
            await ScrapEvent.findByIdAndDelete(isScrapped);
            const event = await Events.findOneAndUpdate({"_id" : ObjectId(eventid)},{ $inc :{"scrapCount":  -1}},{new:true});
            if (!event){/// null
                throw new Error("no corresponding post id");
            }
            return JSON.stringify(event);
        }else{
            await ScrapEvent.create(new Obj.ScrapEventFunc(eventid,userid))
            const event = await Events.findOneAndUpdate({"_id" : ObjectId(eventid)},{ $inc :{"scrapCount":  1}},{new:true});
            if (!event){///null
                throw new Error("no corresponding post id");
            }
            return JSON.stringify(event);
            
        }
        
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};

module.exports = eventController