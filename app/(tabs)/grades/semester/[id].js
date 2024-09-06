import { Link, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { getSemesterId } from "../../../../lib/semesters";
import { ActivityIndicator, Text, View, FlatList, StyleSheet, Pressable } from "react-native";

export default function SemestreId() {

    const { id } = useLocalSearchParams()
    const [semester, setSemester] = useState(null)

    useEffect(() => {
        getSemesterId(id).then((semester) => {
            setSemester(semester)
        })
    }, [])

    if (semester === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <View style={styles.layout}>
            <FlatList
                data={semester.subjects}
                renderItem={({ item }) => <SubjectCard name={item.name} credits={item.credits} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ borderWidth: 1 }} />}
            />
        </View>
    )


}

const SubjectCard = ({ name, credits }) => {

    return (
        <Link href={''} asChild>
            <Pressable>
                <View style={styles.subjectCard}>
                    <Text style={styles.textSubjectCard}>{name + ' ' + credits}</Text>
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
        paddingVertical: 5,
        justifyContent: 'center'
    },
    textSubjectCard: {
        fontSize: 15
    }
})

