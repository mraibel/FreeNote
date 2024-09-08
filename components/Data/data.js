export const getAllDataById = async (id) => {
    const response = await fetch(`http://192.168.0.8:3000/api/allData/` + id);
    const data = await response.json();
    return data
}