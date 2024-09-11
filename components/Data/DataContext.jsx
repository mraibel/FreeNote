import { createContext, useContext, useState } from "react";

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    
    const [data, setData] = useState(null)
    const [semesters, setSemesters] = useState(null)
    const [events, setEvents] = useState(null)

    // currentSubject management
    const [currentSubject, setCurrentSubject] = useState(null)

    const value = {
        // Data management
        data,
        setData,
        // Semesters management
        semesters,
        setSemesters,
        // Events management
        events,
        setEvents,
        // currentSubject management
        currentSubject,
        setCurrentSubject
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}