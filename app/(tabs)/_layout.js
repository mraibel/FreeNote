import { Tabs } from "expo-router";
import { View } from "react-native";
import { TabIconFontAwesome5, TabIconCommunityIcons } from "../../components/icons/TabIcon";

export default function TabLayout() {
    return (
        <View style={{ flex:1 }}>
            <Tabs
                initialRouteName="home"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Inicio',
                        tabBarIcon: ({ focused }) => (
                            <TabIconFontAwesome5 name={"home"} color={focused ? "orange" : "black"}/>
                        )
                    }}
                />

                <Tabs.Screen
                    name="semesters"
                    options={{
                        title: 'Semestres',
                        tabBarIcon: ({ focused }) => (
                            <TabIconCommunityIcons name={"notebook"} color={focused ? "orange" : "black"}/>
                        )
                    }}
                />

                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: 'Calendario',
                        tabBarIcon: ({ focused }) => (
                            <TabIconFontAwesome5 name={"calendar-alt"} color={focused ? "orange" : "black"}/>
                        )
                    }}
                />
            </Tabs>
        </View>
    )
}