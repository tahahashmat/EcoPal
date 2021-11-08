import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";

import HomeScreen from "../screens/HomeScreen"

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 25,
                    height: 90,
                    ...styles.shadow
                }
            }}>

            <Tab.Screen 
                name="HomeTab" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}> HOME 
                            </Text>
                        </View>   
                    ),
                }}
            />
            <Tab.Screen 
                name="Connected Devices"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/light.png')}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}> DEVICES 
                            </Text>
                        </View>   
                    ),
                }}
            />

            <Tab.Screen 
                name="Suggestions" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/suggestion.png')}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}> SUGGESTIONS 
                            </Text>
                        </View>   
                    ),
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/settings.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}> SETTINGS 
                            </Text>
                        </View>   
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;