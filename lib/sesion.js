export const login = async (user) => {
    const response = await fetch(`http://192.168.0.8:3000/api/sesion/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const student = await response.json();
    return student
}