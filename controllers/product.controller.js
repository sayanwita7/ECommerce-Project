//Controller for creating product

const product_model= require ("../models/product.models")

exports.createNewProduct = async (req, res) => {
    const prod_data = {
        name: req.body.name,
        productId: req.body.productId,
        description: req.body.description,        
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
    }
    try{
        const product = await product_model.create(prod_data)
        return res.status(201).send(product)
    }
    catch (err){
        console.log("Error while creating the product", err)
        return res.status(500).send({
            message: "Error while creating the product"
        })
    }
}

exports.removeProduct = async (req, res) => {
    const prod_data = {
        productId: req.body.productId
    }
    try{
        const product = await product_model.deleteOne({productId: prod_data.productId})
        return res.status(201).send(product)
    }
    catch (err){
        console.log("Error while removing the product", err)
        return res.status(500).send({
            message: "Error while removing the product"
        })
    }
}

// exports.productUpdate = async (req, res) => {
//     const prod_data = {
//         productId: req.body.productId
//     }
//     try{
//         const product = await product_model.findOne({productId: prod_data.productId})
//         product
//         return res.status(201).send(product)
//     }
//     catch (err){
//         console.log("Error while updating the product", err)
//         return res.status(500).send({
//             message: "Error while updating the product"
//         })
//     }

// }