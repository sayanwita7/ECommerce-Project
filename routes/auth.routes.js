// Need to intercept : POST localhost:8888/ecomm/api/v1/auth/signup

const authController = require ("../controllers/auth.controller")

module.exports = (app) =>{
    app.post ("/ecomm/api/v1/auth/signup", authController.signup)
}