//Logic to register a user
const bcrypt = require ("bcryptjs")
const user_model = require("../models/user.models")
const jwt = require ("jsonwebtoken")
const secret = require ("../configs/auth.config")

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

exports.signin =  async (req, res)=> {
    //Check if the user id is present in the system
    const user = await user_model.findOne({userId: req.body.userId})
    
    if (user == null){
        return res.status(400).send({
            message: "User id passed is not a valid user id"
        })
    } 

    //Password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password) //Enncrypts the first string and then compares it with the second string which is already encrypted.
    if (!isPasswordValid){
        return res.status(400).send({
            message: "Wrong password passed"
        })
    } 
    //Using JWT, access token is created with a given TTL and returned.
    const token = jwt.sign({id: user.userId}, secret.secret, {
        expiresIn: 120 //seconds
    }) //here, the userId is being used to create the token

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accesstoken: token
    })
}