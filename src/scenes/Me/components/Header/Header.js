import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

function Header() {
  // TODO: Add avatar to header
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.displayNameStyle}>Packy</Text>
    </View>
  );
}

export default Header;
