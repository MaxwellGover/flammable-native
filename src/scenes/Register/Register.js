import React, { Component } from 'react';
import { View } from 'react-native';
import { SignUpForm } from './components';
import globalStyles from '~/config/styles';
import styles from './styles';

class Register extends Component {
  render() {
    return (
      <View style={globalStyles.sceneStyle}>
        <SignUpForm />
      </View>
    );
  }
}

export default Register;
