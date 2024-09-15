import { createContext, useContext, useState } from "react";
import { getSemesterId } from "../../lib/semesters";

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    
    const [data, setData] = useState(null)
    const [semesters, setSemesters] = useState(null)
    const [events, setEvents] = useState(null)

    // currentSubject management
    const [currentSemester, setCurrentSemester] = useState(null)

    const refreshCurrentSemesterData = () => {
        getSemesterId(currentSemester.id).then((semester) => {
            setCurrentSemester(semester)
        })
    }

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
        // currentSemester management
        currentSemester,
        setCurrentSemester,
        refreshCurrentSemesterData
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}