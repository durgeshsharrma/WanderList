const reviews = require('./models/review')
const resort = require('./models/resort')

module.exports.isLoggedIn = (req , res, next) => {
    
    if(!req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl;
        req.flash('error' , 'You Have To Login First');
        return res.redirect('/login');

    }

    
    next();


}


module.exports.reviewAuth = async(req , res , next) => {
     let {id , reviewId} = req.params;
     let review = await reviews.findById(reviewId);

    if(!review.reviewAuthor.equals(res.locals.currUser._id)){

      req.flash('error' , 'You are not the author of that comment');
      return res.redirect(`/home/${id}`);
      
    }
    next();
}


module.exports.isOwner = async(req , res , next) => {
    let {id} = req.params;
    let findResort = await resort.findById(id);
    if(!findResort.owner.equals(res.locals._id)){
        req.flash('error' ,'You do not have permission to make changes in that');
       return res.redirect(`/home/${id}`);
    }
    next();
}


module.exports.saveRedirectUrl = (req , res , next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

