const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Users = require('../models/user');

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email,password,done) =>{
        try{
                const exUser = await Users.findOne({email});
            if (exUser) {
                const result = await bcrypt.compare(password,exUser.password);
                if (result){
                    done (null,exUser);
                }else{
                    done(null,false,{message:'password is wrong'});
                }
            }else{
                done(null,false,{message:'not joined yet'});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};