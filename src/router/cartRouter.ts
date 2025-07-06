import express from 'express'
import { activeCartForUser } from '../services/cartService';
import validateJWT, { ExtendRequest } from '../middlewares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async(req:ExtendRequest, res) => {
    const userId = req.user._id;
    
    // getActiveCartForUser
 const cart = await activeCartForUser({userId})
 
 res.status(200).send(cart)

})


export default router