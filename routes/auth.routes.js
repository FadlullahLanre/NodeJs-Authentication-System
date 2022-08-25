// Authentication routes

// POST /api/auth/signup - for signup route
// POST /api/auth/signin - for login route

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");


module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();

    });
    // signup route
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup

    );

    // Login route
    app.post(
        "/api/auth/signin",
        controller.signin
    );
}