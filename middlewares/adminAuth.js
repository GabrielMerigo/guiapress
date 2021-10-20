function adminAuth(req, res, next){
  if('user' in req.session){
    next();
  }else{
    res.redirect('/');
  }
}

module.exports = adminAuth;