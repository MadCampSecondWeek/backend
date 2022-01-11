const Events = require('../models/event');
const EventComments = require('../models/eventComment');
const EventForms = require('../models/eventForm');
const ScrapEvent = require('../models/scrapEvent');
const ObjectId = require('mongoose').Types.ObjectId;
const Obj = require('../prototype/Obj');
const moment = require('moment');
const today = moment().startOf('day');


eventFormController={};
// get all of the post from the board.
eventFormController.getEventForm = async (eventid,userid) =>{
    try{ 
        const event = await Events.findById(ObjectId(eventid))
        const isHost = event.host.equals(userid);

        if (isHost){
            const eventForms = await EventForms.find().sort({'idx':-1}).limit().lean();

            return JSON.stringify(eventForms)
        }else{
            const eventForm = await EventForms.findOne({author:user}).lean();

            return JSON.stringify(eventForm);
        }
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }
};





/*after submit the writing content, add it to the db
 obj : {title,content,author}*/ 
eventFormController.eventFormWrite = async (eventid,content,contact,headCount,school,userid) =>{
    try{
        const event = await Events.findById(ObjectId(eventid));
        const newEventForm = new Obj.EventForm(content,event.host,contact,headCount,school,eventid,userid);
        const event = await EventForms.create(newEventForm);
        return JSON.stringify(event);
    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}

/* delete requset 
    should delete comments as well*/
eventFormController.deleteOneEventForm = async (eventformid,userid) =>{
    try{
        let eventForm = await EventForms.findOne({"_id" : ObjectId(eventformid)});
        // console.log(userId,post.author,typeof userId, typeof post.author);
        if (userid.equals(eventForm.author)){
            eventForm = await EventForms.deleteOne({"_id" : ObjectId(eventformid)});
            return JSON.stringify(eventForm);
        }else{
            console.log("you can not remove the post");
            return JSON.stringify({errorCode:403,error:"forbbiden"});
        }

    }catch(error){
        console.error(error);
        return JSON.stringify({errorCode:400,error:error.message});
    }   
}



module.exports = eventFormController