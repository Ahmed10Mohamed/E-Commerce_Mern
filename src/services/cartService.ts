import { cartModel, ICart, ICartItem } from "../models/cartModel"
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
interface clearCart{
  userId:string
}
export const clearCart = async({userId}:clearCart)=>{
     const cart = await activeCartForUser({userId})
     cart.items =[];
     cart.totalAmount = 0
     const updateCart = await cart.save();
     return {
      statusCode: 200,
      data: {
        status: true,
        message: "clear item from cart success",
        data: updateCart,
      }
    };
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
interface updateItemsCart{
  productId  : any;
  userId   : string;
  quantity : number;
}
 export const updateItemInCart = async ({productId,userId,quantity}:updateItemsCart)=>{
    const Cart = await activeCartForUser({userId})

    //check this item not found
    const existInCart = Cart.items.find((p) => p.product.toString() === productId);
    if(!existInCart){
        return {
            statusCode: 400,
            data: {
              status: false,
              message: "this item not found in cart!"
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
      //  get all item in cart with out this item
      const otherCartItem = Cart.items.filter((p) => p.product.toString() !== productId)

      // calc total of other item in cart

      let total = calcCartTotalItem({cartItems: otherCartItem})
       // in callBack function add 0 => this main start from 0 
      // update quantity
      existInCart.quantity = quantity;

     //  calc update total
    total += existInCart.quantity * existInCart.unitPrice
    Cart.totalAmount = total;
    // console.log(total);
    const updatedCart = await Cart.save();
    return {
      statusCode: 200,
      data: {
        status: true,
        message: "Product updated in cart",
        data: updatedCart,
      },
    };
}
interface deleteItemInCart{
  productId  : any;
  userId   : string;
}
export const deleteItemCart = async ({userId,productId}:deleteItemInCart) =>{
     const Cart = await activeCartForUser({userId})

    //check this item not found
    const existInCart = Cart.items.find((p) => p.product.toString() === productId);
    if(!existInCart){
        return {
            statusCode: 400,
            data: {
              status: false,
              message: "this item not found in cart!"
            }
          };
      }
           
            //  get all item in cart with out this item
          const otherCartItem = Cart.items.filter(
            (p) => p.product.toString() !== productId
          );
            //  update item in cart
          const total = calcCartTotalItem({cartItems: otherCartItem})
            Cart.items = otherCartItem
            // update totalAmount
            Cart.totalAmount = total;
            // console.log(total);
            const deletedCart = await Cart.save();
        
            return {
              statusCode: 200,
              data: {
                status: true,
                message: "Product deleted in cart",
                data: deletedCart,
              },
            };
    
}

    const calcCartTotalItem = ({
      cartItems,
    }: {
      cartItems: ICartItem[];
    }) => {
      // calc total of other item in cart
      const total = cartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
      }, 0);
      return total;
    };
    
