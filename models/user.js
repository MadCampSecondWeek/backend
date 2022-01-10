const mongoose = require('mongoose');
const db = require('../db')

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
    idx :{
        type:Number,
        required:true,
        unique:true,
        default:0,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    school :{
        type:Number,
        required:true,
        
    },

},
    {
        versionKey: false,
        collection:'users'
});

userSchema.plugin(autoIncrement.plugin,{
    model:'users',
    field:'idx',
    startAt:0,
    increment:1
});


userSchema.index({"idx":1});
const Users = mongoose.model('users',userSchema);

module.exports = Users