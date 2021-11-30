import React, { useState } from 'react';
import {View, Switch, StyleSheet, FlatList, Text,  TouchableOpacity, Image, TextInput} from 'react-native';
import { dummyData, images, COLORS, SIZES, FONTS } from "../constants/index";
import server from '../constants/api';

 const Devices = () => {

    //switch 
    const [lightSwitch1, setToggle1] = useState(false);
    const [lightSwitch2, setToggle2] = useState(false);
    const [lightSwitch3, setToggle3] = useState(false);
    const [lightSwitch4, setToggle4] = useState(false);
    const [temp, setTemp] = useState(20);

    const lightSwitchHandler1 = () => { 
      setToggle1(!lightSwitch1);
      let status = lightSwitch1 ? 'off' : 'on';
      fetch(server.base+server.turnOnLight('room1', status))
      .then(res => res.json())
      .then(value => console.log(value))
      .catch(err => console.error(err))
    };
    const lightSwitchHandler2 = () => {
      setToggle2(!lightSwitch2);
      let status = lightSwitch2 ? 'off' : 'on';
      fetch(server.base+server.turnOnLight('room2', status))
      .then(res => res.json())
      .then(value => console.log(value))
      .catch(err => console.error(err))
    };

    const lightSwitchHandler3 = () => {
        setToggle3(!lightSwitch3);

        let status = lightSwitch3 ? 'off' : 'on';

        fetch(server.base+server.turnOnLight('room3', status))
        .then(res => res.json())
        .then(value => console.log(value))
        .catch(err => console.error(err))
      };

      const lightSwitchHandler4 = () => {
        setToggle4(!lightSwitch4);
        let status = lightSwitch4 ? 'off' : 'on';
        fetch(server.base+server.turnOnLight('room4', status))
        .then(res => res.json())
        .then(value => console.log(value))
        .catch(err => console.error(err))
      };
    
      const tempBtnHandler = () => {
        fetch(server.base + server.setTemp(temp))
        .then(res => res.json())
        .then(value => console.log(value))
        .catch(err => console.error(err))
      };
    
    return(

    <View
        style={{
          position: "absolute",
          marginTop: 25
        }}
      >
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.base }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          style={{
            width: 350,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: 20,
            marginRight: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../assets/light.png")}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  marginRight: 25,
                  tintColor: '#5cb236',
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>Light</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Room 1
              </Text>
            </View>
            <Switch value={lightSwitch1} onValueChange={lightSwitchHandler1} style={{marginLeft: 150, marginTop:10}} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 350,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: 20,
            marginRight: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginTop: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../assets/thermometer.png")}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  marginRight: 25,
                  tintColor: '#5cb236',

                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>Thermostat</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Room 1
              </Text>
            </View>
            <TextInput style={{fontSize: 20, marginLeft: 70}} placeholder="Temp *C" value={temp} onChangeText={text=>setTemp(text)}/>
          </View>
          <TouchableOpacity style={{marginEnd:30}} onPress={tempBtnHandler}>
              <View style={{backgroundColor: "#5cb236",marginTop: 5, marginLeft: 275, width: 40, height: 30, borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'white'}}>Set</Text>
              </View>
            </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 350,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: 20,
            marginRight: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginTop: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../assets/light.png")}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  marginRight: 25,
                  tintColor: '#5cb236',
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>Light</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Room 2
              </Text>
            </View>
            <Switch value={lightSwitch2} onValueChange={lightSwitchHandler2} style={{marginLeft: 150, marginTop:10}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 350,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: 20,
            marginRight: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginTop: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../assets/light.png")}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  marginRight: 25,
                  tintColor: '#5cb236',
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>Light</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Room 3
              </Text>
            </View>
            <Switch value={lightSwitch3} onValueChange={lightSwitchHandler3} style={{marginLeft: 150, marginTop:10}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 350,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: 20,
            marginRight: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginTop: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../assets/light.png")}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  marginRight: 25,
                  tintColor: '#5cb236',
                }}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h2 }}>Light</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Room 4
              </Text>
            </View>
            <Switch value={lightSwitch4} onValueChange={lightSwitchHandler4} style={{marginLeft: 150, marginTop:10}} />
          </View>
        </TouchableOpacity>
        
        </View>
    )

}

export default Devices;