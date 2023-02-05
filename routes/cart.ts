import { addItemtoCart , emptyCart, getCart} from "../controllers/cartController";

const cartController = require ("../controllers/cartController")

const {Router} = require('express');
const {postUser} = require('../controllers/userController')


const cartRouter = Router();

// cartRouter.post("/:productId", addItemtoCart);
cartRouter.post("/:userId/carts/:productId", addItemtoCart);

cartRouter.get("/:userId/carts", getCart);
cartRouter.delete("/:userId/carts/:productId", emptyCart);





module.exports = cartRouter;