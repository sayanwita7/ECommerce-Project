//Creating a middleware to check if the request body is proper and correct
const jwt = require ("jsonwebtoken")
const user_model = require("../models/user.models")
const auth_config = require ("../configs/auth.config")

const verifySignUpBody = async (req, res, next)=> {
    try{
        //Check for name
        if (!req.body.name){
            return res.status(400).send({
                message: "Failed! Name was not provided in the request body"
            })
        }
        //Check for email
        if (!req.body.email){
            return res.status(400).send({
                message: "Failed! Email was not provided in the request body"
            })
        }
        //Check for userId
        if (!req.body.userId){
            return res.status(400).send({
                message: "Failed! User ID was not provided in the request body"
            })
        }
        //Check if the user with the same userId is already present
        const user = await user_model.findOne({userId: req.body.userId })

        if (user){
            return res.status(400).send({
                message: "Failed! User with same User Id is already present. "
            })
        }
        next()
        
    }
    catch (err) {
        console.log("Error while validating the request object")
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
 }

const verifySignInBody = async (req, res, next)=>{
    if (!req.body.userId){
        return res.status(400).send({
            message: "userId is not provided"
        })
    }
    if (!req.body.password){
        return res.status(400).send({
            message: "password is not provided"
        })
    }
    next()
}

const verifyToken = (req, res, next)=> {
    //Check is the token is present in the header
    const token = req.headers['x-access-token']
    if (!token){
        return res.status(403).send({
            message: "No token found: Unauthorized"
        })
    }
    //If it is the valid token
    jwt.verify (token, auth_config.secret, async (err, decoded)=>{
        if (err){
            return res.status(401).send({
                message: "Unauthorised !"
            })
        }
        const user = await user_model.findOne({userId: decoded.id})
        if (!user){
            return res.status(400).send({
                message: "Unauthorised ! The user for this token doesn't exist"
            })
        }
        req.user=user
        next()
    })
    //Move to the next step
    
}
const isAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.userType == "ADMIN"){
        next()
    } 
    else{
        return res.status(403).send({
            message: "Only Admin users are allowed to access this endpoint"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
 }