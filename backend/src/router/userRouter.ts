
import express from "express";
import { register, userLogin } from "../services/userService";

 const router = express.Router();
 router.post("/register",async(req,res) => {
    try {
       const dataBody = req.body;
   
       const {statusCode,data} = await register(dataBody);
       res.status(statusCode).json(data)
      
      }catch (error: any) {
         res.status(500).json(`${error.message}`)
     }
  })

  router.post("/login",async (req,res) => {
     try {
        const {email,password} = req.body
        const {statusCode ,data} = await userLogin({email,password})
        res.status(statusCode).send(data);
      
      }catch (error: any) {
         res.status(500).send(`${error.message}`)
     }
  })

  export default router;