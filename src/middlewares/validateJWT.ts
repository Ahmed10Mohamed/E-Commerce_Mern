import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userModel } from "../models/userModels";

export interface ExtendRequest extends Request{
    user?:any
}

const validateJWT = (req: ExtendRequest ,res: Response,next: NextFunction) =>{
   const authHeader = req.get('authorization');
   if(!authHeader){
      res.status(403).json({ message: "Authorization header was not provider" });

      return;
   }
   const token = authHeader.split(" ")[1];
   if(!token){
         res.status(403).json({ message: "Authorization header is missing" });
         return;
   }
   jwt.verify(token,'Ap#arnNObiP-`7.JTr[A6/T*UKZS>?@o',async (err, payload) => {

        if(err){
             res.status(403).json({ message: "invalid token" });
             return;
        }
        if(!payload){
             res.status(403).json({ message: "invalid token payload" });
             return;
        }
        const userPayload = payload as {
            email     : string;
            firstName : string;
            lastName  : string;
        };
        // fetch user from db based on the payload
        const user = await userModel.findOne({email: userPayload.email})
        req.user = user;
        next();
   })
}

export default validateJWT