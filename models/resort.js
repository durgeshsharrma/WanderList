const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resortSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    image : {
        type : String,
        default : "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg",
        set : (v) => v == "" ?  "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg" : v,
    },

    price : {
        type : Number,
        required  : true,

    },

    country : {
        type : String,
        required : true
    },

    location : {
        type : String,
        required : true    
    }


})


module.exports = mongoose.model("resort" , resortSchema);