const User = require("../model/user");
const Product = require ('../model/product');


export const postUser = async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        accountType:req.body.accountType
    })

    try{
            const newUser = await user.save();
            res.status(201).json(newUser)
    }catch (err){
        res.status(400).json({message: err})
    }

}

export const get = async (req,res) => {
    const users = await User.find();
    res.status(200).json(users);
}

export const put = async(req,res) => {
    const user = await User.findById(req.params.userId);
        user.name=req.body.name || user.name;
        user.email= req.body.email || user.email;
        user.password=req.body.password || user.password;
        user.phoneNumber=req.body.phoneNumber || user.phoneNumber;
        user.accountType=req.body.accountType || user.accountType;
        await user.save();
        res.status(200).json(user);

}

export const deleteUser = async(req,res) => {
    try{
    await User.remove({_id: req.params.userId});
    await Product.remove({created_by:req.params.userId})
    res.status(200).json({Message:"Deleted"})
    }
    catch(error){
        res.status(404).json({Message:error})

        
    }

}



module.exports = {postUser,get,put,deleteUser}