import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from '../Components/productCard';
import { useEffect, useState } from 'react';
import type { product } from '../types/products';
import { BASE_URL } from '../constants/baseUrl';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function HomePage() {
  const [products,setProducts] = useState<product>([]);
  const [error,setError] = useState(false);
  useEffect(() =>{
    const fetchData = async () =>{
        try {
          const response = await fetch(`${BASE_URL}product`);
          const data     = await response.json();
          setProducts(data);
        } catch {
            setError(true)
        }
    }
    fetchData();
  
  },[])
  if(error){

    return  <Box>Something went wrong,please try again!</Box>
  }
  return (
    <Box sx={{ flexGrow: 1 ,mt:2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={4}>
            <Item><ProductCard {...p} /></Item>
          </Grid>

        ))}
       
       
       
      </Grid>
    </Box>
  );
}
