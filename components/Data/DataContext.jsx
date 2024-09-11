import { createContext, useContext, useState } from "react";

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    
    const [data, setData] = useState(null)
    const [semesters, setSemesters] = useState(null)
    const [currentSemester, setCurrentSemester] = useState(null)
    const [currentSubject, setCurrentSubject] = useState(null)

    const value = {
        data,
        setData,
        semesters,
        setSemesters,
        //
        currentSemester,
        setCurrentSemester,
        //
        currentSubject,
        setCurrentSubject
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}