const express = require('express');
const user = require('../models/user');
const router = express.Router();
const { userSchema } = require('../SchemaValidate');
const ExpressError = require('../utilis/ExpressError');
const wrapAsync = require('../utilis/wrapAsync');
const passport = require('passport');



const validateUser = (req , res , next) =>{
     let {err} = userSchema.validate(req.body);
     if(err){
       let errMsg = err.details.map((el) => el.message).join(",");
       throw new ExpressError(401 , errMsg);

     }
     else {
        next();
     }
} 


router.get('/signup' , (req , res) => {
    res.render('user/signup');
})

router.post('/signup' ,validateUser , wrapAsync(async(req , res)=> {
    
    let newUser = new user(req.body);
    
    
    const registeredUser = await user.register(newUser , req.body.password);
    console.log(registeredUser);


    req.login(registeredUser , (err) => {
             if(err){
                return next(err);
             }
             res.redirect('/home')

    })

}))



module.exports = router;