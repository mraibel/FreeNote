// Get All Data by Id Student
export const getAllDataById = async (id) => {
    console.log('alldatabyID '+ id)
    const response = await fetch(`${process.env.ROUTE_API}/api/allData/` + id);
    const data = await response.json();
    return data
}

// Get Initial Data by Id Student
export const getInitialDataById = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/data/initial/` + id);
    const semesters = await response.json();
    return semesters
}