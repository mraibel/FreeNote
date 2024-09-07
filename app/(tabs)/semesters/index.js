import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet, FlatList } from "react-native";
import { getSemestersStudent } from "../../../lib/semesters";
import { Link } from "expo-router";
import GradientBackground from "../../../utils/GradientBackground";
import { DataContext } from "../../_layout";


export default function Index() {

    const [semesters, setSemesters] = useState(null)

    const data = useContext(DataContext)
    
    useEffect(() => {
        setSemesters(data.semesters)
    }, [])

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
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 50 }}>
                {
                    <FlatList
                        data={semesters}
                        renderItem={({ item }) => <SemesterCard name={item.name} id={item.id}/>}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    />
                }
            </View>
        )
    }
}

const SemesterCard = ({ name, id }) => {
    return (
        <Link href={`/semesters/semester/${id}`} asChild>
            <Pressable>
                <GradientBackground style={styles.semesterCard}>
                    <Text style={styles.textSemesterCard}> {name} </Text>
                </GradientBackground>
            </Pressable>
        </Link>
    )
}

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
    semesterCard: {
        backgroundColor: 'red',
        width: 300,
        height: 70,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    textSemesterCard: {
        fontSize: 18,
    }
})