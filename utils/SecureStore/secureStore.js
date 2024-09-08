import * as SecureStore from 'expo-secure-store';

export const getItem = async (key) => {
    try {
        return await SecureStore.getItemAsync(key)
    } catch (e) {
        console.error('Failed to retrieve token', e);
    }
}

export const setItem = async (key, item) => {
    try {
        await SecureStore.setItemAsync(key, item)
    } catch (e) {
        console.error('Failed to save token', e);
    }
}

export const deleteItem = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (e) {
        console.error(e)
    }
}