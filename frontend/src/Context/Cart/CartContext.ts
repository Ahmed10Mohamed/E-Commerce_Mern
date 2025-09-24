import { createContext ,useContext } from "react";

interface CartContextType{
  
}

export const CartContext = createContext<CartContextType>({

})
export const useCart = () =>useContext(CartContext);