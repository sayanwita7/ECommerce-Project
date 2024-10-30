const product_model = require ("../models/product.models")
const productAdd = async (req, res, next) => {
    try {
        if (!req.body.name){
            return res.status(400).send({
                message: "Failed! Name was not provided in the request body"
            })
        }
        if (!req.body.productId){
            return res.status(400).send({
                message: "Failed! Product Id was not provided in the request body"
            })
        }
        if (!req.body.description){
            return res.status(400).send({
                message: "Failed! Description was not provided in the request body"
            })
        }
        if (!req.body.category){
            return res.status(400).send({
                message: "Failed! Category was not provided in the request body"
            })
        }
        if (!req.body.price){
            return res.status(400).send({
                message: "Failed! Price was not provided in the request body"
            })
        }
        if (!req.body.stock){
            return res.status(400).send({
                message: "Failed! Stock was not provided in the request body"
            })
        }
        const prod = await product_model.findOne({productId: req.body.userId })

        if (prod){
            return res.status(400).send({
                message: "Failed! Product with same product Id is already present. "
            })
        }
    } catch (error) {
        console.log("Error while validating the request object")
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }

    next()
}

const productRemove = async (req, res, next) => {
    try {
        const product = req.body.productId
        if (!product){
            return res.status(400).send({
                message: "Failed! Product with given product ID not found"
            })
        }
    } catch (err) {
        console.log("Error while validating the request object")
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
    next()
}

module.exports = {
    productAdd: productAdd,
    productRemove : productRemove
 }