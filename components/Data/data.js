export const getAllDataById = async (id) => {
    console.log('alldatabyID '+ id)
    const response = await fetch(`${process.env.ROUTE_API}/api/allData/` + id);
    const data = await response.json();
    return data
}