const express = require('express');
const router = express.Router();
const resort = require('../models/resort');
const wrapAsync = require('../utilis/wrapAsync.js');
const ExpressError = require('../utilis/ExpressError');
const {resortSchema} = require('../SchemaValidate.js');
const {isLoggedIn , isOwner} = require('../middleware.js');




const validateResort = (req , res , next) => {
        let{ err } = resortSchema.validate(req.body);
        if(err){
                let errMsg = err.details.map((el) => el.message).join(",");
                throw new ExpressError(401 , errMsg);
        }else{
                next();
        }
        
}

router.get('/home' , wrapAsync(async(req , res) => {
        let resorts = await resort.find({});
    
        res.render('resort/home' , {resorts});
}));


//new form render
router.get('/home/new' ,  isLoggedIn , wrapAsync(async(req , res) => {
       res.render('resort/new');
}))

//Create new Route
router.post('/home' ,validateResort, wrapAsync(async(req , res) => {
        let newResort = new resort(req.body);
        newResort.owner = req.user._id;
        await newResort.save().then((res) => {
                console.log(res);
        })
        req.flash('success' , 'New Resort Added Successfully')
        res.redirect('/home');
}))

//Show route
router.get('/home/:id' ,wrapAsync(async(req , res) => {
         let {id} = req.params;
        let findedresort =  await resort.findById(id).populate({path : 'reviews' , populate : {path : 'reviewAuthor' }}).populate('owner');
        console.log(findedresort);
        res.render('resort/show' , {resort : findedresort});
}))


//we have to create edit route
router.get('/home/:id/edit' , isLoggedIn , isOwner,  wrapAsync(async(req , res) => {
        let {id} = req.params;
        let findedresort =  await resort.findById(id);
        res.render('resort/edit' , {resort : findedresort});
       
}))


router.put('/home/:id' ,isLoggedIn,isOwner, wrapAsync(async(req , res) => {
        let {id} = req.params;
        await resort.findByIdAndUpdate(id , req.body);
        req.flash('success' , 'Edit Successfully')
        res.redirect('/home');
}))


router.delete('/home/:id' ,isLoggedIn, wrapAsync(async(req , res) => {
        let {id} = req.params;
        await resort.findByIdAndDelete(id);
        req.flash('success' , 'Deleted Successfully');
        res.redirect('/home');
}))



module.exports = router;