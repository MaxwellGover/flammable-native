import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';

//TODO: See if defaultProps and props are the same

TouchableListItemPropTypes = {
  title: PropTypes.string.isRequired,
  handleOnPress: PropTypes.func.isRequired,
  hideChevron: PropTypes.bool.isRequired,
}

const defaultProps = {
  isSignOutButton: false
}

function TouchableListItem(props) {
  return (
    <ListItem
      title={props.title}
      titleStyle={styles.titleStyle}
      onPress={props.handleOnPress}
      containerStyle={!props.isSignOutButton ? styles.listItemStyle : styles.signOutButtonStyle}
      hideChevron={props.hideChevron}
      underlayColor="#000"
    />
  );
}

TouchableListItem.defaultProps = defaultProps;

export default TouchableListItem;
