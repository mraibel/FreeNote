import { Stack } from "expo-router";
import { createContext, useState } from "react";
import { AuthProvider } from '../components/Auth/AuthContext'
import { PaperProvider } from "react-native-paper";
import { DataProvider } from "../components/Data/DataContext";

export const DataContext = createContext(null);

export default function layout() {

    return (
        <AuthProvider>
            <DataProvider>
                <PaperProvider>
                    <RootLayout />
                </PaperProvider>
            </DataProvider>
        </AuthProvider>
    )
}

function RootLayout() {

    return (
        <>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}