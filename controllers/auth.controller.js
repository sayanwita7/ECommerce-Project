//Logic to register a user
const bcrypt = require ("bcryptjs")
const user_model = require("../models/user.models")
exports.signup = async (req, res) => {
    //Logic to create the user

    //1. Read the request body
    const request_body = req.body
    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try{
        const user_created = await user_model.create(userObj)
        //Should not return sensitive information such as password
        
        res.status(201).send(user_created) //201: succesful created
    }
    catch (err){
        console.log ("Error while registering the user", err)
        res.status(500).send({
            message: "Error occured while registering the user"
        }) //500 : internal server error
    }
    //3. Return the response back to the user


}