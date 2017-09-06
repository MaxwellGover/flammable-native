import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';
import { FlammableVideo } from '~/components';
import { TouchableListItem } from '~/components';

MePropTypes = {
  activePreview: PropTypes.object.isRequired
}

class Me extends Component {
  render() {
    console.log(this.props.activePreview.video)
    if (!this.props.activePreview.video) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    if (this.props.activePreview.video) {
      return (
        <View style={styles.sceneStyleWithPreview}>
          <FlammableVideo video={this.props.activePreview.video} />
        </View>
      );
    }
    return (
      <View style={styles.sceneStyle}>
        <TouchableOpacity onPress={() => Actions.uploads()}>
          <Icon
            name='fire'
            type='simple-line-icon'
            color='#FE4E4D'
            size={80}
          />
          <Text style={{color: '#FFF', marginTop: 20}}>Tap to start a preview</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({user}) {
  console.log(user);
  return {
    activePreview: user.user.activePreview
  }
}

export default connect(mapStateToProps)(Me);
