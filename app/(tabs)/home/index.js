import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import GradientBackground from "../../../components/GradienteBackground/GradientBackground";
import { useData } from "../../../components/Data/DataContext";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../../components/Auth/AuthContext";
import { useEffect } from "react";
import { getAllDataById } from "../../../components/Data/data";
import { getItem } from "../../../utils/SecureStore/secureStore";

export default function Home() {

    const { logout, setAuthState, authState } = useAuth()
    const router = useRouter()

    const { data, setData, setSemesters } = useData()

    useEffect(() => {
        console.log('home1')
        getItem('id').then((id) => {
            const idParse = parseInt(id)
            console.log('homeee')
            getAllDataById(idParse).then((data) => {
                console.log(data)
                setData(data)
                setSemesters(data.semesters)
            }).catch((e) => console.log(e))
        })
    }, [])

    if (data == null) {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size={100} color={'orange'} />
                </View>
            </>
        )
    }

    return (
        <View style={styles.layout}>
            <WelcomeCard name={data.name} />
            <View style={{ flex: 2, paddingTop: 70, gap: 15 }}>
                <OptionCard title={'Último semestre visto'} route={'../semesters'} />
                <OptionCard title={'Ver mis semestres'} route={'../semesters'} />
            </View>
            <View style={{ flex: 1 }}>
                <FastCalendar />
            </View>
            <Button title="salirse" onPress={() => {
                logout(setAuthState).then(() => {
                    router.navigate('/login')
                })
            }} />
        </View>
    )
}

function OptionCard({ title, route }) {

    return (
        <Link href={route}>
            <GradientBackground style={styles.optionCardLayout} start={{ x: 0.3, y: 0.8 }} end={{ x: 0, y: 0 }} >
                <Text style={styles.textOptionCard}>
                    {title}
                </Text>
            </GradientBackground>
        </Link>
    )
}

function WelcomeCard({ name }) {
    return (
        <GradientBackground style={styles.welcomeCardLayout} start={{ x: 0.25, y: 0.25 }} end={{ x: 1, y: 0.75 }}>
            <View>
                <Text style={styles.textWelcome}>
                    {`Bienvenido, ${name}`}
                </Text>
            </View>
            <Image src="" />
        </GradientBackground>
    )
}

function FastCalendar() {
    return (
        <View>
            <Text style={{ textAlign: 'center' }}>
                Aquí voy a poner un calendario con las cosas mas próximas que tenga
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        paddingTop: 75,
        gap: 15
    },
    optionCardLayout: {
        padding: 10,
        alignItems: 'center',
        width: 250,
        height: 50,
        borderBottomRightRadius: 10
    },
    textOptionCard: {
        fontSize: 18
    },
    welcomeCardLayout: {
        width: 300,
        height: 200,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center'
    },
    textWelcome: {
        fontSize: 20
    }

})