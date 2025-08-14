import { createContext ,useContext } from "react";

interface AuthContextType{
    userName        : string | null;
    token           : string | null;
    login           : (userName: string, token: string) => void; //function login return void
    isAuthenticated : boolean;
}

export const AuthContext = createContext<AuthContextType>({userName:null, token:null, login: ()=>{} , isAuthenticated:false})
export const useAuth = () =>useContext(AuthContext);