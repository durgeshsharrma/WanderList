
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocalMongoose = require('passport-local-mongoose');



const userSchema = new Schema({
    email : {
          
        required : true,
        type : String,
    },

    mobileNo : {
        required : true,
        type : Number,
    },

    firstName : {
        required : true,
        type: String
    },

    lastName : {
        required : true,
        type : String,
    }


});


userSchema.plugin(LocalMongoose);



module.exports = mongoose.model('user' , userSchema);