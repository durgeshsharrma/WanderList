const express = require('express');
const ejsMate = require('ejs-mate');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const user = require('./models/user')
const resortRouter = require('./routes/resort');
const methodOverride = require('method-override')
const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
// ----------------------------View Engine Requirements------------------------------------------------
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));


app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "/public")));  //static files like public folder css js
app.use(express.urlencoded({extended : false})); //url from the seach chrome 

//----------------------------------------------------------------------------------------------------------------------------
const sessionOptions = {
    secret : "mysupersecretcode",
    resave  :  false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly  : true,
    }

}


app.use(session(sessionOptions));
app.use(flash());





app.use(passport.initialize())
app.use(passport.session());


passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// Middleware to make flash messages available in views
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.locals.currUser = req.user;
    
    next();
});

//-------------------------------Connection---------------------------------------------------------------
connection().then(() => {
    console.log('connection successful');
})

async function connection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderList');
}
//---------------------------------------------------------------------------------------------------------








//Routers--------------------------------------------------------------------------------------------------


app.use(resortRouter);
app.use(userRouter);
app.use(reviewRouter);

// --------------------------------------Error Handler-------------------------------------------------------

app.use((err , req , res , next) => {
    let {message = "some error occured" , status=401 } = err;
    res.status(status).render('error', {message});
})

//--------------------------------------------------------------------------------------------------------


//---------------------------------------Req Lisner--------------------------------------------------------------

app.listen(3000 , (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('server has started on port 3000');
    }
})

//------------------------------------------------------------------------------------------------------------
