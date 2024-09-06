
export const getSemestersStudent = async (id) => {
    const response = await fetch(`http://192.168.0.8:3000/api/semester/` + id);
    const semesters = await response.json();
    return semesters
}
