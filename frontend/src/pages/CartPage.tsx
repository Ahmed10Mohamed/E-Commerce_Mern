import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Context/AuthContext";

const CartPage = () => {
  const { token } = useAuth();

  if (!token) {
    return <Typography>Please login to view your cart</Typography>;
  }

  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.status == 403){
             setError("you dont have access & you token expired login to show your cart");
          return;
        }
        if (!response.ok) {
          setError("Failed to fetch user cart. Please try again");
          return;
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchCart();
  }, [token]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  console.log("Cart data:", cart);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {/* تقدر تضيف هنا cart details */}
    </Container>
  );
};

export default CartPage;
