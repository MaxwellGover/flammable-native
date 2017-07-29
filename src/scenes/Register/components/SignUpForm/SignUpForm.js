import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { createUser } from '~/redux/modules/authentication';
import PropTypes from 'prop-types';
import globalStyles from '~/config/styles';
import styles from './styles';

SignUpFormPropTypes = {
  dispatch: PropTypes.func.isRequired
}

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  handleSubmit = () => {
    this.props.dispatch(createUser(this.state));
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          placeholder='Username'
          placeholderTextColor="#FFF"
          returnKeyType='next'
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={true}
          style={globalStyles.textInputStyle}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          placeholder='Display name'
          placeholderTextColor="#FFF"
          returnKeyType='next'
          autoCorrect={false}
          onChangeText={(displayName) => this.setState({displayName})}
          style={globalStyles.textInputStyle}
        />
        <TextInput
          keyboardType='email-address'
          placeholder='Email'
          placeholderTextColor="#FFF"
          returnKeyType='next'
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({email})}
          style={globalStyles.textInputStyle}
        />
        <TextInput
          keyboardType='default'
          placeholder='Password'
          placeholderTextColor="#FFF"
          returnKeyType='next'
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          style={globalStyles.textInputStyle}
        />
        <TextInput
          placeholder='Confirm password'
          placeholderTextColor="#FFF"
          returnKeyType='go'
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
          style={globalStyles.textInputStyle}
        />
        <Button
          title='Sign Up'
          buttonStyle={styles.signUpButtonStyle}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default connect()(SignUpForm);
