import { useState, useContext, createContext, useEffect } from "react"
import { getItem } from "../../utils/SecureStore/secureStore"
import { login, register, logout } from "./sesion"

const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
        idStudent: null
    })

    useEffect(() => {
        const checkToken = async () => {
            const token = await getItem('token')
            console.log(token)
            if (token) {
                const id = await getItem('id')
                if(id) {
                    setAuthState({
                        token,
                        authenticated: true,
                        idStudent:id
                    }) 
                }
            } else {
                setAuthState({
                    authenticated: false,
                })
            }
        }
        checkToken()
    }, [])
    
    const value = {
        login,
        register,
        logout,
        authState,
        setAuthState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}