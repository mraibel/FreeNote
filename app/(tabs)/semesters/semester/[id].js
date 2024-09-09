import { Link, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { semesterAverage } from '../../../../utils/semesterAverage'
import { useData } from "../../../../components/Data/DataContext";

export default function SemestreId() {

    const { id } = useLocalSearchParams()
    const [subjects, setSubjects] = useState(null)

    const { data } = useData()

    useEffect(() => {
        setSubjects(data.semesters.find((e) => e.id == id).subjects)
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
            <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 20 }}>Asignatura</Text>
                    <Text style={{ fontSize: 20 }}>Créditos</Text>
                </View>
                <FlatList
                    data={subjects}
                    renderItem={({ item }) => <SubjectCard name={item.name} credits={item.credits} id={item.id} idSemester={id} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ borderWidth: 1 }} />}
                />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                {
                    subjects ? <AverageCard average={semesterAverage(subjects)} /> : <ActivityIndicator color={'orange'} />
                }
            </View>
        </View>
    )


}

const SubjectCard = ({ name, credits, id, idSemester }) => {

    return (
        <Link
            href={{
                pathname:`/semesters/semester/subject/${id}`,
                params: { 
                    idSemester: idSemester,
                }
            }}
            asChild
        >
            <Pressable>
                <View style={styles.subjectCard}>
                    <Text numberOfLines={1} style={styles.subjectSubjectCard}>{name}</Text>
                    <Text style={styles.creditsSubjectCard}>{credits}</Text>
                </View>
            </Pressable>
        </Link>
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
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subjectSubjectCard: {
        flex: 4,
        fontSize: 15,
    },
    creditsSubjectCard: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center'
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

