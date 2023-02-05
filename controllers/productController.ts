import { stringify } from "querystring";
import { isNull } from "util";
import { uploadImage } from "../services/imgUploadService";

const Product = require ('../model/product');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

export const postProduct = async (req,res) => {
    //hawlt ashghlo b cloud 
    // console.log(req.file)
    // const img = uploadImage(req.file.path)
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
            const newProduct = await product.save();
           res.status(201).json(newProduct)

        }
        catch(err){
            res.status(500)
        }
        
    }

    export const productById = async (id) =>{
        const product = await Product.findById(id);
        return product;
    }
    export const findProductById = async (req,res) =>{
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product);
    }

    export const getProduct= async(req,res)=> {
    const{category, orderBy} = req.query;
    
    const filter = {
        category:String,
        orderBy:String,

        
    
    }
    let sort = {};
    if(category){
        filter.category = category;
    }
    if(orderBy){
     sort = {orderBy : -1}
    }
    // if(sellerId){
    //     filter._id = sellerId
    // }
   
    

    let products = await Product.find(filter).sort(sort);
    const checkProducts = Object.values(products)
    console.log(checkProducts);

    if(checkProducts.length == 0){
        products = await Product.find();
    }


    // if(filter.name == null){
    //      products = await Product.find(filter)

    // }
    // else{
    //      products = await Product.find()

    // }
    
    res.status(200).json(products)

        // const products = await Product.find();
        // res.status(200).json(products);
    
    }
    
    module.exports = {postProduct,productById,findProductById,getProduct}