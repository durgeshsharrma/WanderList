const express= require('express');
const review = require('../models/review');
const resorts = require('../models/resort');
const wrapAsync = require('../utilis/wrapAsync');
const router = express.Router();
const {reviewSchema} = require('../SchemaValidate');
const { isLoggedIn ,reviewAuth} = require('../middleware');



const validateReview = (req , res , next) => {
    let{ err } = reviewSchema.validate(req.body);
    if(err){
            let errMsg = err.details.map((el) => el.message).join(",");
            throw new ExpressError(401 , errMsg);
    }else{
            next();
    }
    
}



router.post('/home/:id/reviews' , isLoggedIn ,validateReview, wrapAsync(async(req , res) => {
    let {id} = req.params;
    let resort = await resorts.findById(id);
     let newReview = new review(req.body);
     newReview.reviewAuthor = req.user._id;
     console.log(newReview);

    resort.reviews.push(newReview);
    

    await newReview.save();
    await resort.save();
    console.log(resort);
    req.flash('success' , 'New Review Added Successfully')
   res.redirect(`/home/${id}`);
    

}))


router.delete('/home/:id/reviews/:reviewId', isLoggedIn ,reviewAuth , async(req , res) => {
   let {id , reviewId} = req.params;
   await resorts.findByIdAndUpdate(id , {$pull:{reviews : reviewId}});
   await review.findByIdAndDelete(reviewId);
   req.flash('success' , 'Review Deleted Successfully');
   res.redirect(`/home/${id}`);
})
  



module.exports = router;






