
module.exports = {
    isNotAuth :function(req,res,next){
        if(!req.session.isAuth){
           return next();
        }res.redirect('/');
    },
    isAuth : function(req,res,next){
    if (req.session.isAuth){
        return next();
    } 
    res.redirect("/user/login")
    },
    isOwnerOfTheProfile:function(req,res,next){
        if (req.session.isAuth == req.params.id){
            return next();
        }
        if(!req.session.isAuth){
            return res.redirect("/user/login")
        }
        res.redirect('/');
    }
}