import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text, Pressable, ScrollView, SafeAreaView } from "react-native";
import { useData } from "../components/Data/DataContext";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";
import { getItem } from "../utils/SecureStore/secureStore";
import { getInitialDataById } from "../components/Data/data";
import { LinearGradient } from "expo-linear-gradient";
import { Bell, BookOpen, Calendar, UserCircle, Users } from "lucide-react-native";

export default function Home() {

    const { data, setSemesters, setEvents, setData } = useData()

    const events = [
        { id: 1, title: 'Examen de Matemáticas', date: '2023-06-15' },
        { id: 2, title: 'Entrega de Proyecto', date: '2023-06-18' },
        { id: 3, title: 'Conferencia de Ciencias', date: '2023-06-20' },
    ]

    // router
    const router = useRouter()
    const navto = (route) => {
        router.navigate(route)
    }

    useEffect(() => {
        console.log('home1')
        getItem('id').then((id) => {
            const idParse = parseInt(id)
            console.log('homeee')
            getInitialDataById(idParse).then((initialData) => {
                console.log(initialData)
                // Set inital data
                setData(initialData)
                // Set Semesters
                setSemesters(initialData.semesters)
                // Set Events
                setEvents(initialData.events)
            }).catch((e) => console.log(e))
        })
    }, [])

    if (data == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient colors={['#FF8C00', '#FFA500', '#FFD700']} style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <UserCircle size={48} color="#FFFFFF" />
                        <View style={styles.welcomeTextContainer}>
                            <Text style={styles.welcomeText}>Bienvenido,</Text>
                            <Text style={styles.userName}>{data.name}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonGrid}>
                        <Pressable
                            onPress={() => navto('/semesters')}
                            style={[styles.button, { backgroundColor: '#FF7F50' }]}>
                            <BookOpen size={32} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Último semestre visto</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navto('/semesters')}
                            style={[styles.button, { backgroundColor: '#FFA07A' }]}>
                            <Calendar size={32} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Ver semestres</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navto('/calendar')}
                            style={[styles.button, { backgroundColor: '#FF6347' }]}>
                            <Users size={32} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Eventos</Text>
                        </Pressable>
                    </View>
                    <FastCalendar events={events} />
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

function FastCalendar({ events }) {
    return (
        <View style={styles.calendarContainer}>
            <Text style={styles.calendarTitle}>Próximos Eventos</Text>
            {events.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                    <View style={styles.eventIconContainer}>
                        <Calendar size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventDate}>{event.date}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    welcomeTextContainer: {
        marginLeft: 12,
    },
    welcomeText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap:10,
        padding: 16,
        marginTop:50
    },
    button: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    calendarContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        margin: 16,
        padding: 16,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    calendarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF4500',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    eventIconContainer: {
        backgroundColor: '#FF7F50',
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDate: {
        fontSize: 14,
        color: '#666',
    },
})