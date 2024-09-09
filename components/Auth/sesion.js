import { deleteItem, setItem } from '../../utils/SecureStore/secureStore'

export const login = async (user) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/sesion/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log('aa')

    await setItem('token', data.token)
    console.log('aaa')
    await setItem('id', data.student.id.toString())
    console.log('aaaa')
    return data
}

export const register = async (user) => {
    const response = await fetch(`${process.env.ROUTE_API}/api/sesion/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    const data = await response.json()
    await setItem('token', data.token)
    await setItem('id', data.student.id)
    return data
}

export const logout = async (setAuthState) => {
    await deleteItem('token')
    await deleteItem('id')

    setAuthState({
        token: null,
        authenticated: null,
        idStudent: null
    })

    return
}