const express = require('express');
const user = require('../models/user');
const router = express.Router();
const { userSchema } = require('../SchemaValidate');
const ExpressError = require('../utilis/ExpressError');
const wrapAsync = require('../utilis/wrapAsync');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware');



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

router.post('/signup' , wrapAsync(async(req , res,next)=> {
    
    let newUser = new user(req.body);
    
    
    const registeredUser = await user.register(newUser , req.body.password);
    console.log(registeredUser);


    req.login(registeredUser , (err) => {
             if(err){
                return next(err);
             }
             req.flash('success' , 'Welcome to WanderList')
             res.redirect('/home')

    })

}));

router.get('/login' , (req , res) => {
  res.render('user/login')
})


router.post('/login' ,saveRedirectUrl ,passport.authenticate('local' , {failureRedirect : '/login' , failureFlash : true }) ,wrapAsync( async(req , res) => {
           req.flash('success' , "Welcome Back To WanderList");
           let redirectUrl = res.locals.redirectUrl || '/home';
    
           res.redirect(redirectUrl);

}));


router.get('/logout' , (req , res , next) => {
  req.logOut((err) => {
    if(err){
     return next(err)
    }
    req.flash('success' , 'You Hav Been Successfully Logout');
    res.redirect('/login');
  })
})


module.exports = router;