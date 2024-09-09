export const getSemestersStudent = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/semester/student/` + id);
    const semesters = await response.json();
    return semesters
}

export const getSemesterId = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/semester/` + id);
    const semester = await response.json();
    return semester
}
