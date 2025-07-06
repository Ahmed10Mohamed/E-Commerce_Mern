import express, { response } from 'express'
import { activeCartForUser, addItemToCart, clearCart, deleteItemCart, updateItemInCart } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/extendRequest';

const router = express.Router();

router.get('/', validateJWT, async(req:ExtendRequest, res) => {
    const userId = req.user._id;
    
    // getActiveCartForUser
 const cart = await activeCartForUser({userId})
 
 res.status(200).send(cart)

})
router.post('/items',validateJWT, async (req: ExtendRequest ,res) =>{
    const userId = req.user._id;
    const {productId,quantity} = req.body;
    const response = await addItemToCart({userId,productId,quantity})

    res.status(response.statusCode).send(response.data)
})

router.put('/items',validateJWT, async (req: ExtendRequest ,res) =>{
    const userId = req.user._id;
    const {productId ,quantity} = req.body;
    const response = await updateItemInCart({productId,quantity,userId})
    res.status(response.statusCode).send(response.data)

})

router.delete('/items/:productId',validateJWT,async (req: ExtendRequest,res) =>{
   const userId = req.user._id
    const {productId} = req.params;
    const response = await deleteItemCart({userId,productId})
    res.status(response.statusCode).send(response.data)

})
router.delete('/',validateJWT,async (req:ExtendRequest , res) => {
    const userId = req.user._id
  const response = await clearCart({userId})
  res.status(response.statusCode).send(response.data)

})
export default router