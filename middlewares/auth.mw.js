//Creating a middleware to check if the request body is proper and correct
const user_model = require("../models/user.models")
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

 module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody
 }