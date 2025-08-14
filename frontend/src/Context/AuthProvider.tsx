import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider:FC<PropsWithChildren> = ({children}) =>{
    const[userName,setUserName] = useState<string | null>(localStorage.getItem('userName'));
    const[token , setToken] = useState<string | null> (localStorage.getItem('token'));
 

    const login = (userName: string, token: string)=>{
       setUserName(userName);
       setToken(token);
       localStorage.setItem('userName', userName);
       localStorage.setItem('token', token);
    }

    const isAuthenticated = !!token; //this used to check you have token or no return boolean

   return(
        <AuthContext.Provider value={{ userName , token , login ,isAuthenticated }}>
            {children}
        </AuthContext.Provider>
   )
    
}
export default AuthProvider