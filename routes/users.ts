import { deleteUser, get, put } from "../controllers/userController";

const {Router} = require('express');
const {postUser} = require('../controllers/userController')


const userRouter = Router();

userRouter.post('/', postUser)
userRouter.get('/',get)
userRouter.put('/:userId', put)
userRouter.delete('/:userId', deleteUser)




module.exports = userRouter