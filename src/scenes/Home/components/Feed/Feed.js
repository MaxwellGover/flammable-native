import React, { Component } from 'react';
import { ScrollView } from 'react-native'; // Replace w/ FlatList
import { ListItem } from 'react-native-elements';
import styles from './styles';

function Feed() {
  return (
    <ScrollView style={styles.feedStyle}>
      <ListItem
        title="Packy"
        titleStyle={styles.titleStyle}
        containerStyle={styles.listItemStyle}
      />
    </ScrollView>
  );
}

export default Feed;
