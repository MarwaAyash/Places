import jwt from 'jsonwebtoken';
// if user wants to like a post
// user clicks the login in button => go to  auth middleware to confirm if he has the permission to like the post or  denies
//if ok 
// move to the next step which is like the post
const auth = async (req, res, next) => {
    try {
        
        // after user sign up or sign in, if user wants to like or delete a post we have to check if the token is valid
        const token = req.headers.authorization.split(" ")[1];
        // we want to check if the token is our own  or from google auth
        // if less than 500 then its our own token
        const isCustomAuth = token.length < 500;
        // get the data from the token
        let decodedData;
    
        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, 'test');
            //we know which user is log in so we stored the users' id
            req.userId = decodedData?.id;
            } 
        else {
            // token from google auth
            decodedData = jwt.decode(token);
            // sub is a google name for specific id that differentiate every single google user
            req.userId = decodedData?.sub;
        }    
        
            next();
    } catch (error) {
            console.log(error);
    }
}

export default auth;