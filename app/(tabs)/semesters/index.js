import { ActivityIndicator, Pressable, Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import GradientBackground from "../../../components/GradienteBackground/GradientBackground";
import { useData } from "../../../components/Data/DataContext";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, ChevronRight } from "lucide-react-native";
import { getSemesterId } from "../../../lib/semesters";

export default function Index() {

    const { semesters, setCurrentSemester } = useData()

    // router
    const router = useRouter()
    const navto = (id) => {
        getSemesterId(id).then((semester) => {
            setCurrentSemester(semester)
            router.navigate(`/semesters/semester/${id}`)
        })
    }

    if (semesters == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    if (semesters.length == 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 100 }}>
                <Text style={styles.noSemesters}>No tienes semestres registrados</Text>
                <Text style={styles.noSemesters}>Comenzemos a guardar tus notas!</Text>
                <Link href={'/grades/newSemester'} asChild>
                    <Pressable>
                        <GradientBackground style={styles.buttonNoSemesters} start={{ x: 0.5, y: 0.8 }} end={{ x: 0, y: 0 }} >
                            <Text>Crear semestre</Text>
                        </GradientBackground>
                    </Pressable>
                </Link>
            </View>
        )
    }

    if (semesters.length > 0) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <LinearGradient colors={['#FF8C00', '#FFA500', '#FFD700']} style={styles.container}>
                    <FlatList
                        data={semesters}
                        renderItem={({ item }) => <SemesterItem item={item} navTo={navto}/>}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                    />
                </LinearGradient>
            </SafeAreaView>
        )
    }
}

const SemesterItem = ({ item, navTo }) => (
    <Pressable
        onPress={() => navTo(item.id)}
        style={styles.semesterItem}>
        <View style={styles.semesterIcon}>
            <Calendar size={24} color="#FFFFFF" />
        </View>
        <View style={styles.semesterInfo}>
            <Text style={styles.semesterName}>{item.name}</Text>
        </View>
        <ChevronRight size={24} color="#FF8C00" />
    </Pressable>
);

const styles = StyleSheet.create({
    noSemesters: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonNoSemesters: {
        padding: 10,
        marginTop: 20
    },
    textButtonNoSemesters: {
        fontSize: 15,
        fontWeight: 'semibold'
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    listContent: {
        padding: 20,
        marginTop: 15
    },
    semesterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    semesterIcon: {
        backgroundColor: '#FF7F50',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
    },
    semesterInfo: {
        flex: 1,
    },
    semesterName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    semesterDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
})