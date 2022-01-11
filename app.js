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
const socketIO = require('socket.io');
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


const PORT = process.env.PORT||80;



app.use('/auth',authRouter);
app.use(isLoggedIn);
app.use('/',boardRouter);
app.use('/board',postRouter);
app.use('/user',userRouter);
app.use('/board/comment',commentRouter);
app.use('/eventboard',eventRouter);
app.use('/eventboard/comment',eventCommentRouter);

const server = http.Server(app);//1
const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"],
};
// const io = socket(server,{transports :['websocket','polling,flashsocket'],
//                             cors : {
//                                 origin : server,
//                                 credentials :true,
//                             }});
const io = socketIO(server);//1




const clients = []





io.on('connection',(socket)=>{
    console.log(`${socket.id} connected`);
    // clients.push(socket);
    
    socket.on("join",(school)=>{
        console.log(`${socket.id} join into the ${school} room`);
        socket.join(school.toString());
    });

    socket.on("send",(data)=>{
        console.log(data.message,`has sended from ${socket.id}`)
        console.log(data.school.toString());
        io.to(data.school.toString()).emit("getMessage",data.message);
    });

    socket.on("disconnect",()=>{
        console.log(`${socket.id} disconnected`);
        socket.disconnect();
    })
});





server.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)

});

// const express = require('express');
// const socketIO = require('socket.io');
// const http = require('http');
// const morgan = require('morgan');
// const PORT= 80

// const app = express();
// const server = http.Server(app);
// const io = socketIO(http);
// io.listen(server);

// app.use(morgan('dev'));
// io.on('connection',(socket)=>{
//     console.log("connected");
//     // console.log("User Connected",socket.id);
//     // console.log("connection info ->");
//     // clients.push(socket);
//     // io.to(socket.id).emit("abc");
    

//     // socket.on("join",(school)=>{
//     //     console.log(`want to join in ${school} room`);
//     //     socket.join(school);
//     // });
    
//     // socket.on("send",(school,message)=>{
//     //     console.log(message,`has sended from ${socket.id}`)
//     //     io.to(school).emit("newMessage",message);
//     // });
// });
// // console.log(io)

// server.listen(PORT, ()=>{console.log("pleaseplease")});


