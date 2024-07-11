const JWT = require('jsonwebtoken');

const secret = "BloggerAppByJitendra39withnodejsandmongoose";

function createTokenForUser(User){
    const payload = {
      _id: User._id,
      email: User.email,
      profileImageURL: User.profileImageURL,
      role:User.role,
    }
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
  const payload = JWT.verify(token, secret);
  return payload;
}


module.exports = {
  createTokenForUser,
  validateToken,
}