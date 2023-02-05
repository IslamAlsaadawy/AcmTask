const mongoosee2 = require('mongoose')

const productSchema = mongoosee2.Schema({

    name:String,
    description:String,
    imgpath:String,
    price:Number,
    quantity:Number,
    created_by:String,
    created_at:Date,
    category:String

})

module.exports = mongoosee2.model("Product",productSchema);