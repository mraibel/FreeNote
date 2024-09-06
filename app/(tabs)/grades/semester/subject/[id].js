import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { getGradesSubjectId } from "../../../../../lib/subject"

export default function SubjectId() {

    const { id } = useLocalSearchParams()
    // const [subject, setGrades] = useState(null)

    useEffect(() => {
        /*
        getGradesSubjectId(id).then((subject) => {
            setGrades(subject)
            console.log(subject)
        })
        */
    }, [])

    const subject = {
        "id": 1,
        "name": "Formulación y Evaluación de Proyectos",
        "credits": 4,
        "id_semester": 1,
        "grades": [
            {
                "id": 2,
                "value": null,
                "description": "Contoles",
                "percentage": 30,
                "id_subject": 1,
                "subgrades": [
                    {
                        "id": 1,
                        "value": null,
                        "description": "Control 1",
                        "percentage": 50,
                        "id_grade": 2
                    },
                    {
                        "id": 2,
                        "value": null,
                        "description": "Control 2",
                        "percentage": 50,
                        "id_grade": 2
                    }
                ]
            },
            {
                "id": 1,
                "value": null,
                "description": "Parcial 1",
                "percentage": 30,
                "id_subject": 1,
                "subgrades": []
            },
            {
                "id": 3,
                "value": null,
                "description": "Parcial 3",
                "percentage": 40,
                "id_subject": 1,
                "subgrades": []
            }
        ]
    }

    if (subject === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, margin: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 25 }}>{subject.name}</Text>
            <View style={{ margin: 20 }}>
                <FlatList
                    data={subject.grades}
                    renderItem={({ item }) => <GradeCard item={item} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ borderWidth: 0.2, marginVertical: 15 }} />}
                />
            </View>
        </View>
    )
}

const GradeCard = ({ item }) => {

    const { description, percentage, value, subgrades } = item

    return (
        <View>
            <View style={styles.mainGradeCard}>
                <View style={styles.descriptionGradeCard}>
                    <Text style={styles.fontSizeCard}>{description}</Text>
                    <TextInput style={styles.input} value={percentage || 0} keyboardType="numeric" placeholder="%" />
                </View>
                <View style={styles.valueGradeCard}>
                    <TextInput style={styles.input} value={value || 0} keyboardType="numeric" />
                </View>
            </View>
            <FlatList
                data={subgrades}
                renderItem={({ item }) => <SubGradeCard item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ borderWidth: 0.1 }} />}
            />
        </View>
    )
}

const SubGradeCard = ({ item }) => {

    const { description, percentage, value } = item

    return (
        <View style={styles.subgradeCard}>
            <View style={styles.descriptionSubGradeCard}>
                <Text style={styles.fontSizeCard}>{description}</Text>
                <TextInput style={styles.input} value={percentage || 0} keyboardType="numeric" placeholder="%"  />
            </View>
            <View style={styles.valueGradeCard}>
                <TextInput style={styles.input} value={value || 0} keyboardType="numeric" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainGradeCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    descriptionGradeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3
    },
    valueGradeCard: {
        flex: 1
    },
    input: {
        height: 35,
        margin: 5,
        marginHorizontal: 7,
        borderWidth: 1,
        padding: 10,
    },
    subgradeCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionSubGradeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3,
        marginLeft: 20
    },
    fontSizeCard: {
        fontSize: 17
    }

})