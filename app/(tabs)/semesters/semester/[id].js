import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View, FlatList, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { semesterAverage } from '../../../../utils/semesterAverage'
import { useData } from "../../../../components/Data/DataContext";
import { Book, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { subjectAverage } from "../../../../utils/subjectAverage";

export default function SemestreId() {

    // Data
    const [subjects, setSubjects] = useState(null)

    const { currentSemester } = useData()

    useEffect(() => {
        setSubjects(currentSemester.subjects)
    }, [currentSemester])

    if (subjects === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient colors={['#FF8C00', '#FFA500', '#FFD700']} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.semesterName}>{currentSemester.name}</Text>
                </View>
                <FlatList
                    data={subjects}
                    renderItem={({ item }) => (
                        <SubjectItem subject={item} />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
                <View style={styles.averageContainer}>
                    <Text style={styles.averageText}>Promedio del Semestre</Text>
                    <Text style={styles.averageValue}>{semesterAverage(subjects)}</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const SubjectItem = ({ subject }) => (
    <Link
        href={`/semesters/semester/subject/${subject.id}`}
        asChild
    >
        <Pressable style={styles.subjectItem}>
            <View style={styles.subjectIcon}>
                <Book size={24} color="#FFFFFF" />
            </View>
            <View style={styles.subjectInfo}>
                <Text numberOfLines={1} style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectGrade}>Promedio: {subjectAverage(subject.grades)}</Text>
                <Text style={styles.subjectGrade}>Creditos: {subject.credits}</Text>
            </View>
            <ChevronRight size={24} color="#FF8C00" />
        </Pressable>
    </Link>
)

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    semesterName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    listContent: {
        padding: 16,
    },
    subjectItem: {
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
    subjectIcon: {
        backgroundColor: '#FF7F50',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subjectGrade: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    averageContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 18,
        alignItems: 'center',
    },
    averageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    averageValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF8C00',
        marginTop: 8,
    },
});

