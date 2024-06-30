// Import the JWT library
const jwt = require("jsonwebtoken");
const JWT_SECRETE = "THIS@SECURE$KEY"
// Function to authenticate a user
function fetchuser(req, res, next) {
    // Get the JWT token from the request
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Unauthorized");
    }
    // Verify the JWT token
    try {
        const decoded = jwt.verify(token,JWT_SECRETE);

        // If the token is valid, set the user property on the request
        req.user = decoded;
        // console.log(decoded);
        // Continue to the next middleware function
        next();
    } catch (err) {
        console.log(err);
        // If the token is invalid, return a 401 error
        res.status(401).send("Unauthorized");
    }
    // console.log("stsge1");
}

module.exports = fetchuser;
