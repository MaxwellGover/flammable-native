import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AlertIOS,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

import styles from './styles';

FlammableVideoPropTypes = {
  displayName: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired
};

class FlammableVideo extends Component {
  state = {
    rate: 1,
    paused: true,
    volume: 1,
    muted: false,
    ignoreSilentSwitch: 'obey',
    resizeMode: 'cover',
    modalVisible: false,
  }
  handlePlay = () => {
    this.setState({ paused: !this.state.paused });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => this.handlePlay()}>
          <View style={styles.header}>
            <Text style={styles.displayName}>{this.props.displayName}</Text>
          </View>
          <Video
            source={{ uri: this.props.video }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoadStart={() => {}}
            onLoad={() => { AlertIOS.alert('Is loaded!') }}
            onBuffer={() => {}}
            onProgress={() => {}}
            onEnd={() => { AlertIOS.alert('Done!') }}
            repeat={false}
            controls={false}
          />
        </TouchableOpacity>
        <Button
          title="View Stats"
          textStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            this.setModalVisible(true)
          }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}
        >
         <View style={{ margin: 30 }}>
          <View>
            <Text>Hello World!</Text>
              <Button
                title="Delete Preview"
                buttonStyle={styles.deleteButton}
                textStyle={styles.deleteButtonTextStyle}
                onPress={() => {
                  console.log('DELETE')
                }}
              />
          </View>
         </View>
        </Modal>
      </View>
    );
  }
};

function mapStateToProps ({ user }) {
  return {
    displayName: user.user.displayName,
  }
};

export default connect(mapStateToProps)(FlammableVideo);
