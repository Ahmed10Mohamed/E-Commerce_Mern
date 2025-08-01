import mongoose ,{Document,ObjectId,Schema} from "mongoose";
import { IProduct } from "./productModels";
const cartStatusEnum = ['active','completed']

export interface ICartItem{
     
    product:IProduct;
    unitPrice:number;
    quantity:number;
}

export interface ICart extends Schema{
    userId: ObjectId | String;
    items: ICartItem[];
    totalAmount:Number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
    product:{type: Schema.Types.ObjectId, ref:"Product",required:true},
    unitPrice:{type: Number,required:true},
    quantity:{type: Number,required:true,default:1}
})

const cartSchema = new Schema<ICart>({
    userId:{type: Schema.Types.ObjectId , ref:"User" , required:true},
    items: [cartItemSchema],
    totalAmount:{type:Number,required:true},
    status : {type:String ,enum:cartStatusEnum,default:'active'}
})

export const cartModel = mongoose.model<ICart>("Cart",cartSchema)