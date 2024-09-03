import { Tabs } from "expo-router";
import { View } from "react-native";
import { TabIconFontAwesome5, TabIconCommunityIcons } from "../../components/icons/TabIcon";

export default function TabLayout() {
    return (
        <View style={{ flex:1 }}>
            <Tabs
                initialRouteName="home"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle:{backgroundColor:'gray'}
                    
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Inicio',
                        tabBarIcon: ({ focused }) => (
                            <TabIconFontAwesome5 name={"home"} color={focused ? "white" : "black"}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="grades"
                    options={{
                        title: 'Notas',
                        tabBarIcon: ({ focused }) => (
                            <TabIconCommunityIcons name={"notebook"} color={focused ? "white" : "black"}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: 'Calendario',
                        tabBarIcon: ({ focused }) => (
                            <TabIconFontAwesome5 name={"calendar-alt"} color={focused ? "white" : "black"}/>
                        )
                    }}
                />
            </Tabs>
        </View>
    )
}