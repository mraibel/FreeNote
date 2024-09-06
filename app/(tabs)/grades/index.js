import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { getSemestersStudent } from "../../../lib/semesters";
import { Link } from "expo-router";

export default function Index() {

    const [semesters, setSemesters] = useState(null)

    useEffect(() => {
        getSemestersStudent(2).then((semesters) => {
            setSemesters(semesters)
            console.log(semesters)
        })
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
                    <Pressable style={styles.buttonNoSemesters}>
                        <Text>Crear semestre</Text>
                    </Pressable>
                </Link>
            </View>
        )
    }

    if (semesters.length > 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {
                    semesters.map((e, index) => {
                        return (
                            <Text key={index}>{e.name}</Text>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noSemesters: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonNoSemesters: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 20
    },
    textButtonNoSemesters: {
        fontSize: 15,
        fontWeight: 'semibold'
    }
})