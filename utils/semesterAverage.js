import { subjectAverage } from "./subjectAverage"


export const semesterAverage = (subjects) => {

    if(subjects.length == 0) {
        return
    }

    let averageSummation = 0
    let totalCredits = 0

    subjects.forEach((e) => {
        if (e.grades.length > 0) {
            averageSummation = averageSummation + (subjectAverage(e.grades) * e.credits)
            totalCredits = totalCredits + e.credits
        }
    })

    const promedio = averageSummation / totalCredits
    return promedio.toFixed(1)
}