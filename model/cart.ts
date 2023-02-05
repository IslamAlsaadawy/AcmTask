const mongoosee3 = require('mongoose')

let itemSchema = mongoosee3.Schema({

   productId:{
       type: mongoosee3.Schema.Types.ObjectId,
       ref:"Product"
   },
   name:{
       type:String,
       required:false

   },
   quantity:{
       type:Number,
       required:false,
       min:[1, 'Quantity can not be less than 1']
   },
   price:{
       type:Number,
       required:false
   },
   totalPrice:{
       type:Number,
       required:false
   }

})

const cartSchema = new mongoosee3.Schema({
    items:[itemSchema],
    subTotal:{
        default:0,
        type:Number
    },
    userId:{
        type:mongoosee3.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoosee3.model("Cart",cartSchema);