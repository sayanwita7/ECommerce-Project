//POST localhost:8888/ecomm/api/v1/products

product_controller = require ("../controllers/product.controller")
prod_mw = require ("../middlewares/product.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/productAdd", [prod_mw.productAdd], product_controller.createNewProduct)
}

module.exports = (app)=>{
    app.post("/ecomm/api/v1/productRemove",[prod_mw.productRemove], product_controller.removeProduct)
}