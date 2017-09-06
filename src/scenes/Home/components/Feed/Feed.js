import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import { FlammableVideo } from '~/components';
import styles from './styles';
import globalStyles from '~/config/styles';

FeedPropTypes = {
  feed: PropTypes.array.isRequired
}

function Feed(props) {
  return (
    <View style={{flex: 1, backgroundColor: '#000', padding: 20}}>

    </View>
  );
}

export default Feed;
