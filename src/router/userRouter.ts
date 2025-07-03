
import express from "express";
import { register, userLogin } from "../services/userService";

 const router = express.Router();

 router.get("/",(req,res) => {
      res.send("hello")
 })
 router.post("/register",async(req,res) => {
    const dataBody = req.body;

    const {statusCode,data} = await register(dataBody);

    res.status(statusCode).send(data)
  })

  router.post("/login",async (req,res) => {
     const {email,password} = req.body
     const {statusCode ,data} = await userLogin({email,password})
     res.status(statusCode).send(data);
  })

  export default router;