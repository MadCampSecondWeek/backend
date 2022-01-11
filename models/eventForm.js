const mongoose = require('mongoose');


const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);



const eventFormSchema = new mongoose.Schema({

    content :{
        type : String,
        required : true,
    },
    host:{
        type : mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    contact:{
        type:String,
        required:true,
    },
    headCount :{
        type :Number,
        required: true,
    },
    school :{ // inserted by users themselves.
        type : String,
        required : true,
    },
    status : { //true -> accepted, false -> ongoing
        type : Boolean,
        required : true,
        default : false,
    },
    event : {
        type : mongoose.Types.ObjectId,
        required:true,
        ref:'events',
    },
    author :{
        type : mongoose.Types.ObjectId,
        required:true,
        ref:'users',
    }
},
    {
        timestamps:true,
        versionKey: false,
        collection:'eventforms'
});

eventFormSchema.plugin(autoIncrement.plugin,{
    model:'eventforms',
    field:'idx',
    startAt:0,
    increment:1
});

eventFormSchema.index({"idx":1});


const EventForms = mongoose.model('eventforms',eventFormSchema);

module.exports = EventForms