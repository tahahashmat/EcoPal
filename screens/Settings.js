import React, {useContext} from 'react';
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native';
import { auth } from '../firebase'
import { StateContext } from "./StateProvider";


const Settings = ({ navigation} ) => {
    const {     setUserID,
        setBreakfastListItems,
        setLunchListItems,
        setDinnerListItems,
        setTransportationListItems,
        setTotalTransportation,
    setTotalBreakfast,
    setTotalLunch,
    setTotalDinner } = useContext(StateContext);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate("Login");

            // Reset all the states
            setUserID(null);
            setBreakfastListItems([]);
            setLunchListItems([]);
            setDinnerListItems([]);
            setTransportationListItems([]);
            setTotalTransportation(0);
            setTotalBreakfast(0);
            setTotalLunch(0);
            setTotalDinner(0); 
        }).catch(error => {
            alert(error.message)
        });
    }

    return (
        <View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>    
                </TouchableOpacity>
            </View>
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

    profileText: {
        fontSize: 30,
        alignSelf: 'center'

    },
    profileTextContainer: {
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center'
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
        borderColor: '#228B22',

    },

    button: {
        backgroundColor: 'white',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 550,
        borderColor: '#228B22',
        borderWidth: 2.5,

    },

    buttonText: {
        color: '#228B22',
        fontWeight: '700',
        fontSize: 16,
    },

    buttonOutline: {
        backgroundColor: '#228B22',
        marginTop: 5,
        borderColor: '#228B22',
        borderWidth: 75,
      
    },

    buttonOutlineText: {
        color: '#228B22',
        fontWeight: '700',
        fontSize: 16,
        borderColor: '#228B22',

    },
 
})