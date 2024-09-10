import { Stack } from "expo-router";
import { createContext, useState } from "react";
import { AuthProvider } from '../components/Auth/AuthContext'
import { PaperProvider } from "react-native-paper";

export const DataContext = createContext(null);

export default function layout() {

    return (
        <AuthProvider>
            <RootLayout />
        </AuthProvider>
    )
}

function RootLayout() {

    const [data, setData] = useState(null)

    return (
        <PaperProvider>
            <DataContext.Provider value={data}>
                <Stack initialRouteName="index">
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="register" options={{ headerShown: false }} />
                    <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
                </Stack>
            </DataContext.Provider>
        </PaperProvider>
    )
}