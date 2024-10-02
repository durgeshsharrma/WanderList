const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    rating  : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    }
    ,
    comment : {
       type : String,

    }

    ,
    reviewAuthor : {
        type : Schema.Types.ObjectId,
        ref : 'user',
    }

    ,
    createdAt : {
        type : Date,
        default : Date.now(),
    }
})


module.exports = mongoose.model("review" , reviewSchema);
