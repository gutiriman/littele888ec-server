const firebase = require('../firebase');

async function decodeJWT(req, res, next) {
   //req.headers is set in helper.js of React Frontend.
   //This is verifying the user id passed from front end, 
   //and adding the decoded token to request message.
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];

      try {
         const decodedToken = await firebase.auth.verifyIdToken(idToken);
         req['currentUser'] = decodedToken;
      } catch (error) {
         console.log(error);
      }
   }
   next();
}

module.exports = decodeJWT;