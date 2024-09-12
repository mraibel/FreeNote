// Insert Grade
export const insertGrade = async (grade) => {
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