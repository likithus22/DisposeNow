const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const G_collect = require('../models/Garbage_collector.js');
const fetchuser = require('../middlewear/fetchuser.js');
const router = express.Router();




// Import required modules
const { body, validationResult } = require('express-validator');
const JWT_SECRETE = "THIS@SECURE$KEY"

// Email validation rule
const emailValidator = body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .custom(async (value) => {
        // Check if the email already exists in the database
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email address already exists');
        }
        // If the email is unique, return true
        return true;
    });


// Phone number validation rule
const phoneNumberValidator = body('phone_number')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number');

// const GIDvalidator = body('governmentID')
//     .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/)
//     .withMessage('Please provide a valid phone number');

// Password validation rule
const passwordValidator = body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long');

// Validation middleware
const validate = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return error response if validation fails
        return res.status(400).json({ errors: errors.array() });
    }
    // Proceed to the next middleware if validation passes
    next();
};

// Function to create a JWT token
function createJWTToken(user) {
    // Generate a token
    const token = jwt.sign({
        id: user.id,
        // name: user.name,
    }, JWT_SECRETE,
        {
            expiresIn: "1h",
        }
    );

    // Return the token
    return token;
}

// Function to check the login credentials
async function checkLoginCredentials(email, password, loc) {
    // Find the user in the database
    // Check the login credentials
    const user = await loc.findOne({ email });
    // If the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
        token = createJWTToken(user);
        // console.log(user);
        return token;
    } else {
        return false;
    }
}

//users register logic
router.post('/usr/register', [
    emailValidator,
    phoneNumberValidator,
    passwordValidator,
    validate,
], async (req, res) => {
    let success = false;
    const { name, email, phone_number, address, locationlong, locationlat, EP_type, password } = req.body;
    // creating a secured password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating a nwe user
    const user = new User({
        name, email, phone_number, address, locationlong, locationlat, EP_type,
        password: hashedPassword
    });

    user.save()
        .then(savedUser => {
            console.log('User saved:', savedUser);
        })
        .catch(error => {
            console.error('Error saving user:', error);

        });
    const token = createJWTToken(user);
    // console.log(req.body);
    if (token) {
        success = true;
        res.send({ success, token });
    }
    else {
        res.send({ success, token });
    }
}
)

//collectors register logic
router.post('/col/register', [
    emailValidator,
    // phoneNumberValidator,
    // GIDvalidator,
    passwordValidator,
    validate,
], async (req, res) => {
    let success = false;
    const { name, address, phone_number, governmentID, email, vehicleType, helperAssociated, password } = req.body;
    // creating a secured password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating a nwe user
    const gc = new G_collect({
        name, address, phone_number, governmentID, email, vehicleType, helperAssociated,
        password: hashedPassword
    });
    gc.save()
        .then(savedUser => {
            console.log('User saved:', savedUser);
        })
        .catch(error => {
            console.error('Error saving user:', error);
        });
    // console.log(req.body);
    const token = createJWTToken(gc);
    if (token) {
        success = true;
        res.send({ success, token });
    }
    else {
        res.send({ success, token });
    }

}
)


//users login logic
router.post('/usr/login', [
    // emailValidator,
    // phoneNumberValidator,
    // GIDvalidator,
    passwordValidator,
    validate,
], async (req, res) => {
    let success = false;
    if (!req.body.email || !req.body.password) {
        res.status(400).send("Please enter a username and password.");
        return;
    }
    else {
        const { email, password } = req.body;
        const token = await checkLoginCredentials(email, password, User);
        // console.log(token);
        if (token) {
            success = true
            res.status(200).send({ success, token });
        }
        else {
            res.status(401).send(success, "Invalid username or password.");
        }
    }
}
);


//collectors login logic
router.post('/col/login', [
    emailValidator,
    // phoneNumberValidator,
    // GIDvalidator,
    passwordValidator,
    validate,
], async (req, res) => {

    let success = false;
    // console.log(req.body);
    if (!req.body.email || !req.body.password) {
        res.status(400).send("Please enter a username and password.");
        return;
    }
    else {
        const { email, password } = req.body;
        const token = await checkLoginCredentials(email, password, G_collect);
        // console.log(token);
        if (token) {
            success = true
            res.status(200).send({ success, token });
        }
        else {
            res.status(401).send(success, "Invalid username or password.");
        }
    }
}
);

//authentication of user using token
router.post('/usr/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        // console.log("stsge2");
        const user = await User.findById(userID).select("-password")
        // console.log("stsge3");
        // console.log(user);
        res.send(user);
    } catch (error) {
        // console.log(error);
        res.status(401).send("internal server error");
    }
});

router.post('/col/getcol', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        // console.log("stsge2");
        const user = await G_collect.findById(userID).select("-password");
        // console.log("stsge3");
        // console.log(user);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(401).send("internal server error");
    }
});

router.post('/usr/getuser/up', fetchuser, async (req, res) => {
    try {
        const { location } = req.body;
        const userID = req.user.id;
        // console.log(userID);
        const new_location = location;

        const filter = { _id: userID};
        const update = { $set: { location: new_location } };
    
        const result = await User.updateOne(filter, update);
    // console.log(result);
        res.json(new_location);
    } catch (error) {
        console.log(error);
        res.status(401).send("internal server error");
    }
});

router.post('/col/getcol/up', fetchuser, async (req, res) => {
    try {
        const { location } = req.body;
        const userID = req.user.id;
        // console.log(userID);
        const new_location = location;

        const filter = { _id: userID};
        const update = { $set: { location: new_location } };
    
        const result = await User.updateOne(filter, update);
    // console.log(result);
        res.json(new_location);
    } catch (error) {
        console.log(error);
        res.status(401).send("internal server error");
    }
});

module.exports = router;



