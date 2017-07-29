// Home component renders a list of active previews for the artists a user
// follows

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '~/config/styles';
import Feed from './components/Feed/Feed';
import styles from './styles';

// TODO: Add function here that updates feed w/ latest data
// when pulled down

class Home extends Component {
  render() {
    return (
      <View style={globalStyles.sceneStyle}>
        <Feed />
        <Icon
          reverse
          name='fire'
          type='simple-line-icon'
          color='#FE4E4D'
          containerStyle={styles.iconStyle}
        />
      </View>
    );
  }
}

export default Home;
