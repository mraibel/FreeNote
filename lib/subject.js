export const getGradesSubjectId = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/subject/grade/` + id);
    const subject = await response.json();
    return subject
}