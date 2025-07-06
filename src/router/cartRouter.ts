import express from 'express'
import { activeCartForUser, addItemToCart } from '../services/cartService';
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
    const data = await addItemToCart({userId,productId,quantity})

    res.status(data.statusCode).send(data.data)
})


export default router