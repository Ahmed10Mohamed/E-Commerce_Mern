import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage =  () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error,setError] = useState('');
    const onSubmet = async () =>{
      const firstName     = firstNameRef.current?.value;
      const lastName      = lastNameRef.current?.value;
      const email         = emailRef.current?.value;
      const password      = passwordRef.current?.value;
      console.log(email);
      // console.log('is Working');
      // console.log(name,email,password);
      // make the call to api to create the user
      const response = await fetch(`${BASE_URL}user/register`,{
        method:"POST",
        headers:{
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
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
      
      const data = await response.json();
      console.log(data);
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
        <Typography variant="h4">Register New Account</Typography>
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
          <TextField inputRef={firstNameRef} label="firstName" name="firstName" />
          <TextField inputRef={lastNameRef} label="lastName" name="lastName" />
          <TextField inputRef={emailRef} label="E-Mail" name="email" />
          <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
          <Button onClick={onSubmet} variant="contained" >Register</Button>
          {error && <Typography sx={{ color:"#f00" }} >{error}</Typography>}
        
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
