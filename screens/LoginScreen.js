import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { db, auth } from '../firebase'
import { StateContext } from "./StateProvider";

const LoginScreen = () => {
    const { userID, setUserID } = useContext(StateContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                setUserID(user.uid);
                console.log(user.uid);
                navigation.navigate("Home");
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () =>{
        auth
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () =>{
        auth
        .signInWithEmailAndPassword(email.trim(), password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with: ',user.email);
        })
        .catch(error => alert(error.message))
    }

    return (
        
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
        
        <ImageBackground
            source={require('../assets/banner.jpg')}                    
            resizeMode=""
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
            }}
        >
            

        <View style={styles.inputContainer}>
           
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style = {styles.input}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text) }
                style = {styles.input}
                secureTextEntry
            />

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>    
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>    
                </TouchableOpacity>
            </View>
            </ImageBackground>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: { 
        width: '80%',
        marginTop: "75%" },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    button: {
        backgroundColor: '#228B22',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#228B22',
        borderWidth: 2,
    },

    buttonOutlineText: {
        color: '#228B22',
        fontWeight: '700',
        fontSize: 16,
    },
 
})