import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View, FlatList, StyleSheet } from "react-native";
import { semesterAverage } from '../../../../utils/semesterAverage'
import { useData } from "../../../../components/Data/DataContext";
import { Card, Button, IconButton } from "react-native-paper";

export default function SemestreId() {

    // Data
    const [ subjects, setSubjects ] = useState(null)
    const { currentSemester, setCurrentSubject } = useData()

    useEffect(() => {
        setSubjects(currentSemester.subjects)
    }, [])

    if (subjects === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <View style={styles.layout}>
            <View style={{ flex: 7, padding: 20 }}>
                <FlatList
                    data={subjects}
                    renderItem={({ item }) => <SubjectCard name={item.name} credits={item.credits} id={item.id} setSubject={setCurrentSubject} subject={item}/>}
                    keyExtractor={item => item.id}
                />
            </View>
            {
                subjects.length > 0 ? (
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20}}>
                    {
                        subjects ? <AverageCard average={semesterAverage(subjects)} /> : <ActivityIndicator color={'orange'} />
                    }
                </View>
                ) : ''
            }
        </View>
    )
}

const SubjectCard = ({ name, credits, id, setSubject, subject }) => {

    function setCurrentSubject() {
        setSubject(subject)
    }

    return (
        <Card style={styles.subjectCard}>
            <Card.Content>
                <View style={styles.subjectContent}>
                    <Text numberOfLines={1} style={styles.subjectText}>{name}</Text>
                    <Text style={styles.subjectCode}>{credits}</Text>
                </View>
            </Card.Content>
            <Card.Actions>
                <Link
                    href={`/semesters/semester/subject/${id}`}
                    asChild
                    onPress={setCurrentSubject}
                >
                    <Button>
                        Ver Detalles
                    </Button>
                </Link>
                <IconButton
                    icon="calendar"
                    onPress={() => {/* Acción para agregar un evento de la asignatura */ }}
                />
            </Card.Actions>
        </Card>
    )
}

const AverageCard = ({ average }) => {
    return (
        <View style={styles.averageCard}>
            <Text style={{ fontSize: 17 }}>Tu promedio este semestre es:</Text>
            <View style={styles.squareAverageCard}>
                <Text>{average}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 10
    },
    subjectCard: {
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3
    },
    subjectContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subjectText: {
        fontSize: 20,
        color: '#1c1c1e',
    },
    subjectCode: {
        fontSize: 16,
        color: '#666',
    },
    averageCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    squareAverageCard: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        width: 75,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

