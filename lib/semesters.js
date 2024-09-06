
export const getSemestersStudent = async (id) => {
    const response = await fetch(`http://192.168.0.8:3000/api/semester/student/` + id);
    const semesters = await response.json();
    return semesters
}

export const getSemesterId = async (id) => {
    const response = await fetch(`http://192.168.0.8:3000/api/semester/` + id);
    const semester = await response.json();
    return semester
}
