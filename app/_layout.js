import { Stack } from "expo-router";
import { createContext, useState, useEffect } from "react";
import { getAllDataById } from "../lib/data";
import { View, ActivityIndicator } from 'react-native'

export const DataContext = createContext(null);

export default function layout() {

    const [data, setData] = useState(null)

    useEffect(() => {
        getAllDataById(1).then((data) => {
            setData(data)
        })
    }, [])

    if (data === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <DataContext.Provider value={data}>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </DataContext.Provider>
    )
}