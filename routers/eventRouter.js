/* This is the router code for the url under /board/~ */
const express = require('express');
const eventRouter = express.Router();
const Posts = require('../models/post');
const eventController = require('../controllers/eventController');
const queryOk = require('../public/queryOk');

/* Get all posts */
const getAllEventRouter = async (req,res) =>{
    if (!queryOk([req.query.category])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventController.getAllEvent(req.query.category);
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }
        else res.status(200).send(result);
    }
};

const getScrappedEventsRouter = async (req,res) =>{
    // if (!queryOk([req.query.userid])){
    //     const result = {errorCode:400,error:"no appropriate query request"}
    //     console.log(result);
    //     res.status(400).send(result);
    // }else{
        const result = await eventController.getScrappedEvents(req.user._id);
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    
};


// //get a specific post
const getOneEventRouter = async (req,res) =>{
    if (!queryOk([req.query.eventid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        res.status(400).send(result);
    }else{
        const result = await eventController.getOneEvent(req.query.eventid,req.user._id);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}

/* write submit */
const eventWriteRouter = async (req,res) =>{
/*     const obj1= {first:1, second:2, third:3};
       const obj2 = delete obj1['second'];
       const obj2= (({ title, content,writer }) => ({ title, content,writer }))(obj1); */
       
    if (!queryOk([req.query.category])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
            const {title,content,headCount,location,time} = req.body;
            const result = 
                await eventController.eventWrite(
                    req.query.category,
                    title,
                    content,
                    req.user._id,
                    headCount,
                    location,
                    time,
                    Number(req.user.school)
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
const deleteOneEventRouter = async (req,res)=>{
    if (!queryOk([req.query.eventid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventController.deleteOneEvent(req.query.eventid,req.user._id)
        if (result.hasOwnProperty("error")){
            console.log(result);
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }

}

const scrapEventRouter = async (req,res)=>{
    if (!queryOk([ req.query.eventid])){
        const result = {errorCode:400,error:"no appropriate query request"}
        console.log(result);
        res.status(400).send(result);
    }else{
        const result = await eventController.scrapEvent(req.query.eventid,req.user._id);
        if (result.hasOwnProperty("error")){
            res.status(400).send(result);
        }else{
            res.status(200).send(result);
        }
    }
}


eventRouter.use((req,res,next)=>{

    console.log("hi")
    next()
})


eventRouter.get('/',getAllEventRouter); 
eventRouter.post('/event',eventWriteRouter);
eventRouter.get('/event',getOneEventRouter);
eventRouter.delete('/event',deleteOneEventRouter);
eventRouter.post('/event/scrap',scrapEventRouter);
eventRouter.get('/event/scrap',getScrappedEventsRouter);
// eventRouter.get('/today-popular',getTodayPopulareventsRouter);
module.exports= eventRouter;
