import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { getAllDataById } from "./data";

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    
    const [data, setData] = useState(null)

    const { authState } = useAuth()

    useEffect(() => {
        if(authState.idStudent) {
            getAllDataById(authState.idStudent).then((data) => {
                setData(data)
            })
        }
    }, [])

    const value = {
        data,
        setData
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}