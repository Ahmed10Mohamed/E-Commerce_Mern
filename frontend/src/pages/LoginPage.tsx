import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage =  () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {login}   = useAuth();
    const navigate  = useNavigate();
    const [error,setError] = useState('');

    const onSubmet = async () =>{

      const email         = emailRef.current?.value;
      const password      = passwordRef.current?.value;

      // validate the form data
      if(!email || !password){
        setError('check submitted data!')
        return;
      }
    
      // console.log('is Working');
      // console.log(name,email,password);
      // make the call to api to create the user
      const response = await fetch(`${BASE_URL}user/login`,{
        method:"POST",
        headers:{
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      if (!response.ok) {
        const errorData = await response.json();
      
        setError(
          typeof errorData === 'string'
            ? errorData
            : errorData.message || 'Something went wrong'
        );
      
        return;
      }
      
      const Token = await response.json();
      if(!Token){
        setError('Incorrect token');
        return;
      }

      login(email,Token.data);
    //   return to home page after login
      navigate('/');
}

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Login Account</Typography>
        <Box sx={{ 
            display: "flex",
            flexDirection: "column",
              gap: 2,
              mt: 2,
              border:1,
              p:2,
              borderColor:"#ccc"
                }}
        >
          <TextField inputRef={emailRef} label="E-Mail" name="email" />
          <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
          <Button onClick={onSubmet} variant="contained" >Login</Button>
          {error && <Typography sx={{ color:"#f00" }} >{error}</Typography>}
        
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
