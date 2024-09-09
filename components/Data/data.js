export const getAllDataById = async (id) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/allData/` + parseInt(id));
    const data = await response.json();
    return data
}