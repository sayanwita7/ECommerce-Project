//localhost:8888/ecomm/api/v1/auth/signup

//Starting file of the project
const express = require ("express")
const mongoose = require ("mongoose")
const app = express()
const server_config = require("../authauthor_project/configs/server.configs")
const db_config = require ("../authauthor_project/configs/db.configs")
const user_model = require("../authauthor_project/models/user.models")
const bcrypt = require ("bcryptjs")

app.use(express.json()) //Middleware to convert json to jsobjeccts

//Connection with mongodb
mongoose.connect (db_config.DB_URL)
const db = mongoose.connection
db.on("error", ()=> {
    console.log('Error while connecting to the mongoDB')
})
db.once("open", ()=> {
    console.log("Connected to MongoDB")
})
app.listen (server_config.PORT , ()=> {
    console.log ("Server started at port number: ", server_config.PORT)
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})

        if (user){
            console.log("Admin is already present")
            return
        }

        try{
            user = await user_model.create({
                name: "Sayanwita",
                userId: "admin",
                email: "sayanwita@gmail.com",
                userType: "ADMIN",
                password: bcrypt.hashSync("Welcome1", 8)
            })
            console.log("Admin created", user)
        }
        catch (err){
            console.log("Error while creating admin", err)
        }
    }
    catch (err){
        console.log("Error while reading the data", err)
    }
    
}

//Stitching the route to the server
require ("./routes/auth.routes")(app)
require ("./routes/category.routes")(app)