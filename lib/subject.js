export const getGradesSubjectId = async (id) => {
    const response = await fetch(`http://192.168.0.8:3000/api/subject/grade/` + id);
    const subject = await response.json();
    return subject
}