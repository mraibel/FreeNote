import { Link, Tabs } from "expo-router";
import { View } from "react-native";
import { TabIconFontAwesome5, TabIconCommunityIcons } from "../../components/icons/TabIcon";
import { House } from "lucide-react-native";

export default function layout() {
    return (
        <View style={{ flex:1 }}>
            <Tabs
                screenOptions={{
                    tabBarHideOnKeyboard:true,
                    headerStyle:{backgroundColor:'#F28911'},
                    headerRight: () => (
                        <Link href={'/home'} asChild>
                            <House size={25} color={'black'} style={{margin:25}}/>
                        </Link>
                    )
                }}
            >
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