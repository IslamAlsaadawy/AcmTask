const express = require('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const uri = "mongodb+srv://IslamAlsaadawy:Islam123.@cluster0.vwqflpr.mongodb.net/test";
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDb");
    }
    catch(error){
        console.error("error")
    }
};
mongoose.set('strictQuery', false);

connect();



app.use(express.json());

const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')


try{
app.use('/users',userRoutes)
app.use('/products',upload.single('imgpath'),productRoutes)
app.use('/users', cartRoutes)
}catch(error){
    
}


app.listen(2300, ()=>{
    console.log('server is running on port 2300')
})