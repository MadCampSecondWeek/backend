const fs = require('fs');
const url = require('url');
const morgan = require('morgan');
const nodemon = require('nodemon');

const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');

require('dotenv').config

require('./db');
require('./models/post');
require('./models/user');
require('./models/comment');
const router = require('./routers/main');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');
const commentRouter = require('./routers/commentRouter');
const boardRouter = require('./routers/boardRouter');

const app = express();



app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave:false,
    saveUninitialized:true
}));


const PORT = process.env.PORT||80;


const post = require('./models/post');

app.use('/',boardRouter);
app.use('/board',postRouter);
app.use('/user',userRouter);
app.use('/board/comment',commentRouter);



// app.get('/',(req,res)=>{
//     res.send('Merong');
// });
const server = app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}`))


