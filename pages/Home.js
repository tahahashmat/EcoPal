import React from 'react';
import {View, Text, Stylesheet, Image } from 'react-native';

export function Home({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        <Image style = { {width: '50%', height: undefined, aspectRatio: 3}} source = {require('../assets/ecologo.png')}/>
        <Text>LightHub Mobile App</Text>
        <Text></Text>
        <Text>Created by:</Text>
        <Text>Taha Hashmat</Text>
        <Text>Mitchell Hicks</Text>
        <Text>Austin Page</Text>
        <Text>Cassidy Linhares</Text>
        <Text>Tolu Elebute</Text>
      </View>
    );
  }