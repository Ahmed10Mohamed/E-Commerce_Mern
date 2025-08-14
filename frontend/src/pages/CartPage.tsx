import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Context/AuthContext";

const CartPage =()=>{
    const {token} = useAuth();
    const [cart,setCart]   = useState();
        if(!token){
            return;
        }
    const [error,setError] = useState('');
    useEffect(()=>{
        const fetchCart = async () =>{
                const response = await fetch(`${BASE_URL}cart`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(!response.ok){
                    setError('failed ti fetch user cart. please try again')
                }
                const data = await response.json();
                setCart(data);
        }
      
         fetchCart();
    },[token])
    console.log(cart);
   return <Container variant="h4" spacing={2}><Typography>My Cart</Typography></Container>
}
export default CartPage;