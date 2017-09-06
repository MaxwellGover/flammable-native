import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Login from './components/Login/Login';
import styles from './styles';

function Splash(props) {
  return (
    <View style={styles.sceneStyle}>
      <Login />
      <TouchableOpacity onPress={() => Actions.register()}>
        <Text style={{color: '#fff'}}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Splash;
