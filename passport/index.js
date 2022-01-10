//This file is for the passport configuration

const passport = require('passport');
const local = require('./localStrategy');
const Users = require('../models/user');

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser((_id,done) =>{
        Users.findOne({_id})
            .then(
                user =>{done(null,user)})
            .catch(err=>done(err))
    });

    local();
}