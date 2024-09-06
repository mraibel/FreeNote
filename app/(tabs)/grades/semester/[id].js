import { Link, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { getSemesterId } from "../../../../lib/semesters";
import { ActivityIndicator, Text, View, FlatList, StyleSheet, Pressable } from "react-native";

export default function SemestreId() {

    // const { id } = useLocalSearchParams()
    // const [semester, setSemester] = useState(null)

    useEffect(() => {
        /*
        getSemesterId(id).then((semester) => {
            setSemester(semester)
        })
        */
    }, [])


    subjects = [
        { "id": 1, "name": "Formulación y Evaluación de Proyectos", "credits": 4, "id_semester": 1 },
        { "id": 2, "name": "Legislación", "credits": 3, "id_semester": 1 },
        { "id": 3, "name": "Sistemas Operativos", "credits": 6, "id_semester": 1 },
        { "id": 4, "name": "Inteligencia Artificial", "credits": 4, "id_semester": 1 },
        { "id": 5, "name": "Ingeniería de Software", "credits": 5, "id_semester": 1 },
        { "id": 6, "name": "Práctica Profesional 2", "credits": 9, "id_semester": 1 }
    ]

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20 }}>Asignatura</Text>
                    <Text style={{ fontSize: 20 }}>Créditos</Text>
                </View>
                <FlatList
                    data={subjects}
                    renderItem={({ item }) => <SubjectCard name={item.name} credits={item.credits} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ borderWidth: 1 }} />}
                />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <AverageCard average={54.5} />
            </View>
        </View>
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

const SubjectCard = ({ name, credits }) => {

    return (
        <Link href={'/'} asChild>
            <Pressable>
                <View style={styles.subjectCard}>
                    <Text numberOfLines={1} style={styles.subjectSubjectCard}>{name}</Text>
                    <Text style={styles.creditsSubjectCard}>{credits}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 10
    },
    subjectCard: {
        width: 'full',
        height: 50,
        paddingVertical: 10,
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
    averageCard:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10 
    },
    squareAverageCard:{ 
        padding: 5, 
        borderWidth: 1, 
        borderColor: 'gray', 
        width: 75, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

