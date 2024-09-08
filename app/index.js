import { Redirect } from "expo-router";
import { useAuth } from "../components/Auth/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

    const { authState } = useAuth()
    
    if(authState.authenticated == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={50} color={'orange'} />
            </View>
        )
    }

    if(authState.authenticated) {
        return <Redirect href={'/home'} />
    }

    return <Redirect href={'/login'} />
}