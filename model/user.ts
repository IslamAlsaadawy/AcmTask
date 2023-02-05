const mongoosee = require('mongoose')

const userSchema = mongoosee.Schema({

    name:String,
    email:String,
    password:String,
    phoneNumber:String,
    accountType:String,

})

module.exports = mongoosee.model("User",userSchema);