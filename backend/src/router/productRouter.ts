import express from 'express'
import { getAllProducts } from '../services/productService';

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        
        const products = await getAllProducts();
    
        res.status(200).send(products)
    }catch (error: any) {
        res.status(500).send(`Something went wrong! ${error.message}`)
    }

})

export default router;
