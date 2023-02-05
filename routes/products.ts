import { findProductById, getProduct, postProduct } from "../controllers/productController";


const {Router} = require('express');
const {postUser} = require('../controllers/userController')


const productRouter = Router();

productRouter.post('/', postProduct)
productRouter.get('/:productId',findProductById)
productRouter.get('/', getProduct)





module.exports = productRouter;