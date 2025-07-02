import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";

const app = express();
const port = 3001;
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("MOngo connected"))
.catch((err) => console.log('failed to connect!',err))

app.use('/user',userRouter)
  app.listen(port,() =>{
    console.log(`server is running in port ${port}`)
  })