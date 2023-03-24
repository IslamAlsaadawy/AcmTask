import { stringify } from "querystring";
import { isNull } from "util";
import { uploadImage } from "../services/imgUploadService";

const Product = require ('../model/product');
const multer = require('multer');
const User = require("../model/user");
const upload = multer({dest:'uploads/'});

export const postProduct = async (req,res) => {
    const userId = req.body.created_by;
    const product = new Product({
        name : req.body.name,
        // imgpath : img,
        imgpath:req.file.path,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        quantity : req.body.quantity,
        created_at : req.body.created_at,
        created_by :req.body.created_by})

        try{
            const user = await User.find({_id:userId});
            
            if(!user[0] || user[0].accountType !="seller"){
                res.status(400).json({messsage: "Not a seller"});
            }
            const newProduct = await product.save();
           res.status(201).json(newProduct)

        }
        catch(err){
             console.log(err);
            
        }
        
    }


    export const findProductById = async (req,res) =>{
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product);
    }

    export const getProduct= async(req,res)=> {
    const{category, orderBy,sellerId} = req.query;
    
    const filter = {
        category:String,
        orderBy:String,
        sellerId:String

    }
    let sort = {};
    if(category){
        filter.category = category;
    }
    if(sellerId){
        filter.sellerId = sellerId;
    }
    if(orderBy){
     sort = {orderBy : -1}
    }

    

    let products = await Product.find({category:category, created_by:sellerId}).sort(sort);
    const checkProducts = Object.values(products)
    console.log(checkProducts);

    if(checkProducts.length == 0){
        products = await Product.find();
    }


    res.status(200).json(products)

      
    }
    
    module.exports = {postProduct,findProductById,getProduct}