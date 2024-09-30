const express = require('express');
const router = express.Router();
const resort = require('../models/resort');
const wrapAsync = require('../utilis/wrapAsync.js');
const ExpressError = require('../utilis/ExpressError');
const {resortSchema} = require('../SchemaValidate.js');



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
router.get('/home/new' ,wrapAsync(async(req , res) => {
       res.render('resort/new');
}))

//Create new Route
router.post('/home' ,validateResort, wrapAsync(async(req , res) => {
        let newResort = new resort(req.body);
        await newResort.save().then((res) => {
                console.log(res);
        })
        res.redirect('/home');
}))

//Show route
router.get('/home/:id' ,wrapAsync(async(req , res) => {
         let {id} = req.params;
        let findedresort =  await resort.findById(id);
        res.render('resort/show' , {resort : findedresort});
}))


//we have to create edit route
router.get('/home/:id/edit' , wrapAsync(async(req , res) => {
        let {id} = req.params;
        let findedresort =  await resort.findById(id);
        res.render('resort/edit' , {resort : findedresort});
       
}))


router.put('/home/:id' , wrapAsync(async(req , res) => {
        let {id} = req.params;
        await resort.findByIdAndUpdate(id , req.body);
        res.redirect('/home');
}))


router.delete('/home/:id' , wrapAsync(async(req , res) => {
        let {id} = req.params;
        await resort.findByIdAndDelete(id);
        res.redirect('/home');
}))



module.exports = router;