import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { storeSongDetails } from '~/redux/modules/uploads';
import styles from './styles';

function FlammableList(props) {
  return (
    <List style={styles.sceneStyle}>
      <FlatList
        data={props.list}
        renderItem={({item}) => (
          <ListItem
            title={item.songName}
            onPress={() => {
              props.dispatch(storeSongDetails(item));
              Actions.record();
            }}
            underlayColor='#000'
            containerStyle={{borderBottomColor: '#141414'}}
            titleStyle={{color: '#FFF'}}
          />
        )}
        keyExtractor={item => item.downloadURL}
      />
    </List>
  );
}

FlammablePropTypes = {
  list: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default FlammableList;
