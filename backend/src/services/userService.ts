import { userModel } from "../models/userModels"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
interface registerParam{
    firstName : string
    lastName  : string
    email     : string
    password  : string
}

// when you need to call any thing from db you should to user async & await
export const register = async (params: registerParam) => {
   const findUser = await userModel.findOne({email : params.email})

  
    
    if (findUser) {
        return {
          statusCode: 400,
          data: {
            status: false,
            message: "User already exists!",
            data: null
          }
        };
      }

    const hashPassword = await bcrypt.hash(params.password,10);
    const newUser = new userModel({
        firstName:params.firstName,
        lastName:params.lastName,
        email:params.email,
        password:hashPassword,
    })
    // because you need to save in db or api or service you should to use await
    await newUser.save();
    return {
        statusCode: 201,
        data: {
          status: true,
          message: "User registered successfully",
          data: generateJwt({firstName:newUser.firstName,lastName:newUser.lastName,email:newUser.email,})
        }
      };
}

interface loginParam{
    email    : string
    password : string
}


export const userLogin = async ({ email, password }: loginParam) => {
    const findUser = await userModel.findOne({ email });
  
    if (!findUser) {
      return {
        statusCode: 400,
        data: {
          status: false,
          message: "Incorrect email or password",
          data: null
        }
      };
    }
  
    const passwordMatch = await bcrypt.compare(password, findUser.password);
  
    if (!passwordMatch) {
      return {
        statusCode: 400,
        data: {
          status: false,
          message: "Incorrect email or password",
          data: null
        }
      };
    }
  
    return {
      statusCode: 200,
      data: {
        status: true,
        message: "Login successful",
        data: generateJwt({firstName:findUser.firstName,lastName:findUser.lastName,email:email})
      }
    };
  };
  
  const generateJwt = (data:any) =>{
     return jwt.sign(data,process.env.JWT_SECRET || '',{expiresIn:'24h'})
  }