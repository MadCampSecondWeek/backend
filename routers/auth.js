const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./loginMiddlewares');
const Users = require('../models/user');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const { restart } = require('nodemon');

const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res)=>{

    const {school,email,password} = req.body;
    try{
        const exUser = await Users.findOne({email});
        if (exUser) {
            return res.status(403).send("user already exists");
        }
        const hash = await bcrypt.hash(password, 12);
        await Users.create({
            school,
            email,
            password:hash,
        });
        console.log("joined");
        return res.status(200).send("joined");
    }catch(error){
        console.error(error);
        return res.status(500).send('internal error');
    }
});

router.post('/login',isNotLoggedIn,async(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if (authError){
            console.error(authError);
            return res.status(500).send(authError);
        }
        if(!user){
            return res.status(403).send(info.message);
        }
        return req.login(user,(loginError)=>{
            if (loginError){
                return res.status(500).send(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

router.post('logout',isLoggedIn, async (req,res)=>{
    req.logout();
    req.session.destroy();

    //////////////////////
    // res.redirect('/');
    res.status(200).send('log out!');
    //////////////////////
});

module.exports = router;