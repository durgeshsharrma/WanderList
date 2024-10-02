const joi = require('joi');




module.exports.resortSchema = joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        image : joi.string().allow("" , null),
        price : joi.number().required().min(0),
        location : joi.string().required(),
        country : joi.string().required(),

    }).required()



    module.exports.userSchema = joi.object({
        firstName : joi.string().required(),
        lastName : joi.string().required(),
        mobileNo : joi.number().required().max(10).min(10),
        email : joi.string().required(),

    }).required();


    module.exports.reviewSchema = joi.object({
        rating : joi.number().min(1).max(5).required(),
        comment : joi.string().required(),
    }).required()