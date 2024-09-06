import { Link } from "expo-router";
import { View, StyleSheet, Text, Image, Button, Pressable } from "react-native";
import GradientBackground from "../../../utils/GradientBackground";

export default function Home() {

    const userName = 'Mi Shangrila'

    return (
        <View style={styles.layout}>
            <WelcomeCard name={userName} />
            <View style={{ flex: 2, paddingTop: 70, gap: 15 }}>
                <OptionCard title={'Último semestre visto'} route={'../grades'} />
                <OptionCard title={'Ver mis semestres'} route={'../grades'} />
            </View>
            <View style={{ flex: 1 }}>
                <FastCalendar />
            </View>
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
        borderBottomRightRadius:10
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