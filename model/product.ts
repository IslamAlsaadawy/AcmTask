const mongoose = require('mongoose')


const productSchema = mongoose.Schema({

    name:String,
    description:String,
    imgpath:String,
    price:{
        type:Number,
        default:0
    },
    quantity:Number,
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created_at:Date,
    category:String

})

module.exports = mongoose.model("Product",productSchema);