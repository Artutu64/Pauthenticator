import React, {useState, useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuthContext(){
    return useContext(AuthContext)
}

export function AuthProvider(props){

    const [token, setToken] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log("Start: " + isLoggedIn)
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            console.log("ON ENTRE LA DEDANS")
            setToken(storedToken);
            setIsLoggedIn(true);
        }
        console.log("end: " + isLoggedIn)
      }, []);
    
    const logout = () => {  
        setToken(null);
        setIsLoggedIn(false);
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            localStorage.removeItem("token");
        }
        <Navigate to="/connexion" replace={true}/>
    }

    const login = (newToken)=> {
        setToken(newToken);
        setIsLoggedIn(true);
        localStorage.setItem("token", newToken);
        <Navigate to="/" replace={true}/>
    }

    const value = {
        token, setToken, isLoggedIn, setIsLoggedIn, logout, login
    }

    return (
        <AuthContext.Provider value = {value}>
            {props.children}
        </AuthContext.Provider>
    )

}