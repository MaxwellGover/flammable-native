import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { FlammableList } from '../../components';
import { connect } from 'react-redux';
import _ from 'lodash';

UploadedSongsPropTypes = {
  list: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

class UploadedSongs extends Component {
  render() {
    console.log(this.props.list)
    return (
      <View style={styles.sceneStyle}>
        <FlammableList
          list={this.props.list}
          dispatch={this.props.dispatch}
        />
      </View>
    );
  }
}

function mapStateToProps({user}) {
  return {
    list: _.values(user.user.uploadedSongs)
  }
}

export default connect(mapStateToProps)(UploadedSongs);
