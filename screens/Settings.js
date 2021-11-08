import React from 'react';
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native';
import { auth } from '../firebase'



const Settings = ({ navigation} ) => {

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate("Login");
        }).catch(error => {
            alert(error.message)
        });
    }

    return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>    
                </TouchableOpacity>
            </View>
    )
  }

export default Settings;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    inputContainer: { 
        width: '80%'},

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
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