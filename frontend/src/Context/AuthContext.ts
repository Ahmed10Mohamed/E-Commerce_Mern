import { createContext ,useContext } from "react";

interface AuthContextType{
    userName        : string | null;
    token           : string | null;
    isAuthenticated : boolean;
    login           : (userName: string, token: string) => void; //function login return void
    logout          : () => void;
}

export const AuthContext = createContext<AuthContextType>({userName:null, token:null, isAuthenticated:false , login: ()=>{} , logout: () =>{} })
export const useAuth = () =>useContext(AuthContext);