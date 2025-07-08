import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";
import cartRouter  from "./router/cartRouter";
import { seedProducts } from "./services/productService";
import cors from "cors";

dotenv.config();
// console.log(process.env.DATABASE_URL)

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.DATABASE_URL || "")
.then(() => {
  console.log("MOngo connected");
  seedProducts();
}
)
.catch((err) => console.log('failed to connect!',err))


app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
  app.listen(port,() =>{
    console.log(`server is running in port ${port}`)
  })