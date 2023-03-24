// const express = require('express');
import express from "express";
// const mongoose = require('mongoose')
import mongoose from "mongoose";
import multer from "multer";
require('dotenv').config();


const app = express()
const upload = multer({dest:'uploads/'});

const uri =process.env.MONGOURI ;
async function connect(){
    try{
        await mongoose.connect(uri||"test");
        console.log("Connected to MongoDb");
    }
    catch(error){
        console.log(error);
        
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