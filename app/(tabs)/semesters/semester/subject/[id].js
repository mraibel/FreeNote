import { useLocalSearchParams } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { getGradesSubjectId } from "../../../../../lib/subject"
import { DataContext } from "../../../../_layout"

export default function SubjectId() {

    const { id, idSemester } = useLocalSearchParams()
    const [subject, setSubject] = useState(null)

    const data = useContext(DataContext)

    useEffect(() => {
        setSubject(data.semesters.find((e) => e.id == idSemester).subjects.find((e) => e.id == id))
    }, [])

    if (subject === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    if(subject.grades > 0) {
        return(
            <>
            </>
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
                    <TextInput style={styles.input} value={percentage} keyboardType="numeric" placeholder="%" />
                </View>
                <View style={styles.valueGradeCard}>
                    <TextInput style={styles.input} value={value} keyboardType="numeric" />
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