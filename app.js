const fs = require('fs');
const url = require('url');
const morgan = require('morgan');
const nodemon = require('nodemon');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const socket = require('socket.io');
const passport = require('passport');
require('dotenv').config


require('./db');
require('./models/post');
require('./models/user');
require('./models/comment');

const passportConfig = require('./passport');

const { isLoggedIn } = require('./routers/loginMiddlewares');

// const router = require('./routers/main');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');
const commentRouter = require('./routers/commentRouter');
const boardRouter = require('./routers/boardRouter');
const eventRouter = require('./routers/eventRouter');
const eventCommentRouter = require('./routers/eventCommentRouter');
const authRouter = require('./routers/auth');

const app = express();
passportConfig();





app.use(morgan('dev'));
app.use(cors({credentials:true}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('@#@$MYSIGN#@$#$'));

app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave:false,
    saveUninitialized:false,
    // cookie:{
    //     httpOnly : false,
    //     secure : false,
    // }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    console.log(req.headers.cookie);
    next();
});

const PORT = process.env.PORT||80;



app.use('/auth',authRouter);
app.use(isLoggedIn);
app.use('/',boardRouter);
app.use('/board',postRouter);
app.use('/user',userRouter);
app.use('/board/comment',commentRouter);
app.use('/eventboard',eventRouter);
app.use('/eventboard/comment',eventCommentRouter);

const server = http.createServer(app);
const io = socket(server);

// const postController = require('./controllers/postController');

server.listen(PORT,async()=>{
    console.log(`app listening on port ${PORT}`)

});


const clients = []

io.on('connect',(socket)=>{
    clients.push(socket);
    io.to(socket.id).emit("connect");

    console.log("User Connected",socket.id);
    console.log("connection info ->"+socket.request.connectioon_peername);
    

    socket.on("join",(school)=>{
        console.log(`want to join in ${school} room`);
        socket.join(school);
    });
    
    socket.on("send",(school,message)=>{
        console.log(message,`has sended from ${socket.id}`)
        io.to(school).emit("getMessage",message);
    });

    

});

