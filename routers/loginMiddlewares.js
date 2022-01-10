exports.isLoggedIn  = (req,res,next)=>{
    if (req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('need Login');
    }
};

exports.isNotLoggedIn = (req,res,next) =>{
    if (!req.isAuthenticated()){
        next();
    }else{
        // const message =  encodeURIComponent('you have logged in');
        // res.status(400).send(message);
        console.log("in midlle ware");
        res.redirect('/');
    }
}