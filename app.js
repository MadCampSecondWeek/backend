const fs = require('fs');
const url = require('url');
const morgan = require('morgan');
const nodemon = require('nodemon');

const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
require('dotenv').config
const app = express();

require('./db');
// require('./models/post');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave:false,
    saveUninitialized:true
}));
const router = require('./routers/main');
const postRouter = require('./routers/postRouter');

const PORT = process.env.PORT||80;


const post = require('./models/post');
app.use('/',router);
app.use('/board',postRouter);





// app.get('/',(req,res)=>{
//     res.send('Merong');
// });
const server = app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}`))


