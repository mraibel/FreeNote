import { IPV4 } from "../utils/variables";

export const getGradesSubjectId = async (id) => {
    const response = await fetch(`http://${IPV4}:3000/api/subject/grade/` + id);
    const subject = await response.json();
    return subject
}