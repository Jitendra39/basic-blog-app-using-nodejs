const { validateToken } = require("../services/Authentication");

function checkForAuthenticationCookie(cookieName) {
  return(req, res, next) => {
 const tokenCookiValue = req.cookies[cookieName];

 if(!tokenCookiValue){
    return next();
 }

 try{
  const userPayload = validateToken(tokenCookiValue);
  req.user = userPayload;
  return next();
 }catch(err){
  return next();
 }
  }
}


module.exports = {
  checkForAuthenticationCookie,
}