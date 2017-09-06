import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { loginUser } from '~/redux/modules/authentication';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import globalStyles from '~/config/styles';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit = () => {
    this.props.dispatch(loginUser(this.state))
  }
  render() {
    return (
      <View>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={(email) => this.setState({email})}
          placeholder='Email'
          placeholderTextColor='#FFF'
          keyboardAppearance='dark'
          style={globalStyles.textInputStyle}
        />
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          onChangeText={(password) => this.setState({password})}
          placeholder='Password'
          placeholderTextColor='#FFF'
          keyboardAppearance='dark'
          secureTextEntry={true}
          style={globalStyles.textInputStyle}
        />
        <Button
          title='Login'
          buttonStyle={styles.loginButtonStyle}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default connect()(Login);
