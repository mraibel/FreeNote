import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, useController } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Register() {

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm()
    const password = watch('password');

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#F28911', '#EBF7F3']}
                start={{ x: 0.1, y: 0.3 }}
                end={{ x: 1, y: 0.8 }}
                style={styles.background}
            >
                {/* Logo de la app */}
                <View style={styles.logoContainer}>

                    <Text style={styles.logoText}>FreeNote</Text>
                </View>

                {/* Caja de inicio de sesión */}
                <View style={styles.loginBox}>
                    <Text style={styles.title}>Registro</Text>
                    <Input
                        name={'email'}
                        control={control}
                        placeholder={'Correo electrónico'}
                        password={false}
                        errors={errors.email}
                    />
                    <Input
                        name={'password'}
                        control={control}
                        placeholder={'Contraseña'}
                        password={true}
                        errors={errors.password}
                    />
                    <Input name={'repeatPassword'}
                        control={control}
                        placeholder={'Confirmar contraseña'}
                        password={true}
                        errors={errors.repeatPassword}
                        validate={{
                            validate: value => value === password || 'Las contraseñas no coinciden'
                        }}
                    />
                    <Button mode='contained' onPress={handleSubmit(onSubmit)} style={styles.loginButton} >
                        Iniciar sesión
                    </Button>
                    <Link href={'/login'} asChild >
                        <Text style={styles.signupText}>
                            ¿Ya tienes cuenta? Inicia sesión
                        </Text>
                    </Link>
                </View>
            </LinearGradient>
        </View>
    );
}

function Input({ name, control, placeholder, password, errors, validate }) {

    const { field } = useController({
        control,
        defaultValue: '',
        name,
        rules: {
            required: `${placeholder} es requerido`,
            pattern: name === 'email' ? {
                value: /^\S+@\S+$/i,
                message: 'Formato de correo inválido'
            } : undefined,
            validate,
        }
    })

    return (
        <>
            <TextInput
                mode='outlined'
                value={field.value}
                onChangeText={field.onChange}
                style={styles.input}
                label={placeholder}
                secureTextEntry={password}
                right={password ? <TextInput.Icon icon="eye" /> : ''}
            />
            {errors && <Text style={styles.errorText}>{errors.message}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#003366', // Azul Marino
        marginTop: 10,
    },
    loginBox: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#FFFFFF', // Blanco
        borderRadius: 10,
        elevation: 5,
        borderColor: '#F28911', // Borde naranja para armonizar con el gradiente
        borderWidth: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#003366', // Azul Marino
    },
    input: {
        marginBottom: 10,
    },
    loginButton: {
        paddingVertical: 10,
        backgroundColor: '#F28911',
        marginBottom: 10,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#555',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});
