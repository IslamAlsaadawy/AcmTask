const Cart = require('../model/cart')
const ProductDetails = require('../controllers/productController')

const addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}

const currentCart = async (userId) => {
    const carts = await Cart.find({userId:userId}).populate({
        path:"items.productId",
        select:"name price total"
    
    });
    return carts[0];

}

export const addItemtoCart = async (req,res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const quantity = Number.parseInt(req.body.quantity);
    try{
        let cart = await currentCart(userId);
        let productDetails = await ProductDetails.productById(productId);
        if(!productDetails){
            return res.status(500).json({
                type:"Not Found",
                msg:"invalid request",
                product:productDetails,
                productid: productId,
                quantity: quantity
            })
        }
        if(cart){
            const indexFound = cart.items.findIndex(item => item.productId.id == productId)
            if(indexFound !== -1 && quantity <= 0){
                cart.items.splice(indexFound, 1);
                if(cart.items.length==0){
                    cart.subTotal = 0;
                    cart.userId = userId;
                }else{
                    cart.subTotal = cart.subTotal +cart.items[indexFound].price*cart.items[indexFound].quantity
                    // cart.subTotal = 20;
                    cart.userId = userId;
                }
            }
            else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                // cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                cart.subTotal = cart.subTotal + cart.items[indexFound].quantity*cart.items[indexFound].price;
                cart.userId = userId;
            }

            else if (quantity > 0) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: productDetails.price * quantity
                    
                })
                // cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                cart.subTotal = productDetails.price * productDetails.quantity;
                cart.userId = userId;
            }
        
        else {
            return res.status(400).json({
                type: "Invalid",
                msg: "Invalid request"
            })
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Process successful",
            data: data
        })
        
    }
    else{
        console.log(productDetails);

        const cartData = {
            items:[{
                productId: productId,
                quantity: quantity,
                total:productDetails.price*quantity,
                price:productDetails.price
            }],
            
            subTotal: productDetails.price* productDetails.quantity,
            userId: userId
        }
        cart = await addItem(cartData)
        res.json(cart);

    }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

   

export const getCart = async (req, res) => {
    try {
        let userId = req.params.userId;
        let cart = await currentCart(userId);
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

export const emptyCart = async (req, res) => {
    try {
        let cart = await currentCart(req.params.userId);
        
        const itemFound = cart.items.find(item => item.productId = req.params.productId);
        cart.subTotal = cart.subTotal - itemFound.price*itemFound.quantity;
        cart.items.remove(itemFound);
        
        
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

module.exports = {addItemtoCart,getCart,emptyCart}