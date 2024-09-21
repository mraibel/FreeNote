// Insert Grade
export const insertGrade = async (grade) => {
    console.log(grade)
    const response = await fetch(`${process.env.ROUTE_API}/api/grade/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(grade),
    });
    const data = await response.json();
    return data
}

// Eliminar Nota
export const deleteGrade = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/grade/${id}`, {
        method: "DELETE"
    })
    return response
}