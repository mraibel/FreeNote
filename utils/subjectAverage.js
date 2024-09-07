export const subjectAverage = (grades) => {

    let promedio = 0

    grades.forEach((e) => {
        if (e.subgrades.length > 0) {
            const average = subGradeAverage(e.subgrades)
            promedio = promedio + average * (e.percentage / 100)
        } else {
            promedio = promedio + e.value * (e.percentage / 100)
        }
    })

    return promedio.toFixed(1)
}

const subGradeAverage = (subgrades) => {
    let promedio = 0

    subgrades.forEach((e) => {
        promedio += e.value * (e.percentage / 100)
    })
    return promedio
}