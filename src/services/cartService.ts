import { cartModel } from "../models/cartModel"
import productModel from "../models/productModels";

interface createCartForUser{
    userId:string
}

const createCartForUser = async ( {userId}:createCartForUser) => {

    const cart = await cartModel.create({userId,totalAmount:0})
    await cart.save();
  
    return cart;
}

interface activeCartForUser{
    userId:string
}

export const activeCartForUser = async ({userId}:activeCartForUser ) =>{
     
    let cart = await cartModel.findOne({userId,status:"active"});

    if(!cart){
        cart = await createCartForUser({userId})
    }

    return cart;
}
interface itemsCartData{
    productId  : any;
    userId   : string;
    quantity : number;
}

export const addItemToCart = async ({userId , productId ,quantity}:itemsCartData) =>{
    
    const Cart = await activeCartForUser({userId})

    //check this item found in this cart
    const existInCart = Cart.items.find((p) => p.product.toString() === productId);
    if(existInCart){
        return {
            statusCode: 400,
            data: {
              status: false,
              message: "item already exists in cart!"
            }
          };
    }
    // fetch product 
    const product = await productModel.findById(productId)
    if(!product){
        return {
            statusCode: 400,
            data: {
              status: false,
              message: "this product not found",
            }
          };
    }
    if(product.stock < quantity){
        return {
            statusCode: 400,
            data: {
              status: false,
              message: "Low stock for item",
            }
          };
    }
    Cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity : quantity
    })

    // update totalAmount in cart
   Cart.totalAmount = Number(Cart.totalAmount) + product.price * quantity;
    const updateCart = await Cart.save();
    return {
        statusCode: 200,
        data: {
          status: true,
          message: "Product added to cart",
          data: updateCart,
        },
      };
}