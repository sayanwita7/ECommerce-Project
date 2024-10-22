// Need to intercept : POST localhost:8888/ecomm/api/v1/auth/signup
//Middleware is always in the form of an array

const authController = require ("../controllers/auth.controller")
const authMW = require ("../middlewares/auth.mw")
module.exports = (app) =>{
    app.post ("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup)

    //Route for POST localhost:8888/ecomm/api/v1/auth/signin
    app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignInBody],authController.signin)
}