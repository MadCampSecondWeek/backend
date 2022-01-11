/* This is the router code for the url under /board/~ */
const express = require('express');
const eventFormRouter = express.Router();
const Posts = require('../models/post');
const eventController = require('../controllers/eventController');
const queryOk = require('../public/queryOk');





// //get a specific post
const getEventFormRouter = async (req,res) =>{
    if (!queryOk([req.query.eventid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        res.status(400).send(result);
    }else{
        const result = await eventController.getEventForm(req.query.eventid,req.user._id);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            console.log(result);
            res.status(200).send(result);
        }
    }
}

/* write submit */
const eventFormWriteRouter = async (req,res) =>{
/*     const obj1= {first:1, second:2, third:3};
       const obj2 = delete obj1['second'];
       const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1); */
       
    if (!queryOk([req.query.eventid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
            const {content,contact,headCount,school} = req.body;
            const result = 
                await eventFormController.eventFormWrite(
                    req.query.eventid,
                    content,
                    contact,
                    headCount,
                    school,
                    req.user._id,
                );

            if (result.hasOwnProperty("error")){
                console.log(result);
                res.status(400).send(result);
            }else{
                res.status(200).send(result);
            }
    }
}


// //delete a specific post
const deleteEventFormRouter = async (req,res)=>{
    if (!queryOk([req.query.eventformid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventController.deleteOneEventForm(req.query.evenformid,req.user._id)
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }

}






eventFormRouter.post('/e',eventFormWriteRouter);
eventFormRouter.get('//',getEventFormRouter);
eventFormRouter.delete('/',deleteEventFormRouter);

// eventFormRouter.get('/today-popular',getTodayPopulareventsRouter);
module.exports= eventFormRouter;
