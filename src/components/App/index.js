// This component handles routing for the app

import React from 'react';
import { View, Text } from 'react-native';
import {
  Scene,
  Router,
  Actions
} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { fbAuth } from '~/config/settings';
import { connect } from 'react-redux';
import { isAuthed, notAuthed } from '~/redux/modules/authentication';
import { Register } from '~/scenes';
import { Home } from '~/scenes';
import { Me } from '~/scenes';
import { Settings } from '~/scenes';
import styles from './styles';
import PropTypes from 'prop-types';

AppPropTypes = {
  dispatch: PropTypes.func.isRequired
}

class App extends React.Component {
  componentDidMount() {
    // Check if user is authed
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.dispatch(isAuthed);
        Actions.home();
      } else {
        // No user is signed in.
        this.props.dispatch(notAuthed);
        Actions.register();
      }
    });
  }
  render() {
    // TODO: Change rightTitle to users avatar
    // TODO: Fix Nav bar styles
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="register"
            title="SIGN UP"
            component={Register}
            navigationBarStyle={{backgroundColor: '#141414'}}
            titleStyle={{color: '#FFF'}}
            backTitle="BACK"
            initial={true}
          />
          <Scene
            key="home"
            title="PREVIEWS"
            component={Home}
            navigationBarStyle={{backgroundColor: '#141414'}}
            titleStyle={{color: '#FFF'}}
            renderRightButton={() => <Icon name="user" type="simple-line-icon" color="#FFF" underlayColor="#141414" iconStyle={styles.iconStyle} onPress={() => Actions.me()}/>}
            onRight={() => {}}
            hideBackImage={true}
          />
          <Scene
            key="me"
            title="YOUR PROFILE"
            component={Me}
            navigationBarStyle={{backgroundColor: '#141414'}}
            titleStyle={{color: '#FFF'}}
            renderRightButton={() => <Icon name="settings" type="simple-line-icon" color="#FFF" underlayColor="#141414" iconStyle={styles.iconStyle} onPress={() => Actions.settings()}/>}
            onRight={() => {}}
            hideBackImage={true}
            renderLeftButton={() => <Icon name="arrow-left" type="simple-line-icon" color="#FFF" underlayColor="#141414" iconStyle={styles.backIconStyle} onPress={() => Actions.pop()}/>}
          />
          <Scene
            key="settings"
            title="SETTINGS"
            component={Settings}
            navigationBarStyle={{backgroundColor: '#141414'}}
            titleStyle={{color: '#FFF'}}
            hideBackImage={true}
            renderLeftButton={() => <Icon name="arrow-left" type="simple-line-icon" color="#FFF" underlayColor="#141414" iconStyle={styles.backIconStyle} onPress={() => Actions.pop()}/>}
          />
        </Scene>
      </Router>
    );
  }
}

export default connect()(App);
