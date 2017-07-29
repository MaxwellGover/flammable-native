import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableListItem } from '~/components';
import globalStyles from '~/config/styles';
import styles from './styles';

class Me extends Component {
  render() {
    return (
      <View style={globalStyles.sceneStyle}>
        <TouchableListItem
          title="Available Streams"
          handleNavigation={() => {}}
        />
        <TouchableListItem
          title="My Active Preview"
          handleNavigation={() => {}}
        />
        <TouchableListItem
          title="Following"
          handleNavigation={() => {}}
        />
      </View>
    );
  }
}

export default Me;
