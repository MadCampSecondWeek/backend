const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
require('dotenv').config
const app = express();

// require('./db');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave:false,
    saveUninitialized:true
}));
const router = require('./routers/main');

const PORT = process.env.PORT||80;



app.use('/',router);
// app.get('/',(req,res)=>{
//     res.send('Merong');
// });
const server = app.listen(PORT,()=>console.log(`Example app listening on port ${PORT}`))


