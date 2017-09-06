import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { saveVideoPath } from '~/redux/modules/uploads';
import styles from './styles';
import Camera from 'react-native-camera';

RecordPropTypes = {
  dispatch: PropTypes.func.isRequired
}

class Record extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      timer: 5,
      isRecording: false,
      limitReached: false,
      type: Camera.constants.Type.back,
      flashMode: Camera.constants.FlashMode.off
    }
  }
  render() {
    return (
      <View style={styles.sceneStyle}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.camera}
          type={this.state.type}
          orientation="portrait"
          flashMode={this.state.flashMode}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={true}
          CaptureQuality={Camera.constants.CaptureQuality.low}
          captureMode={Camera.constants.CaptureMode.video}
          captureTarget={Camera.constants.CaptureTarget.disk}
          keepAwake={true}>
          <Text>{this.state.timer}</Text>
          <Text>{this.state.isRecording}</Text>
          <TouchableOpacity onPress={this.startRecording.bind(this)}>
            <Text style={styles.capture}>[CAPTURE]</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopRecording.bind(this)}>
            <Text>[STOP RECORDING]</Text>
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
  startRecording = () => {
    if (this.camera) {
      this.setState({
        isRecording: true
      });

      this.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => {
          const path = data.path;
          this.props.dispatch(saveVideoPath(path));
          Actions.preview(path);
        })

      this.interval = setInterval(() => {
        const timer = this.state.timer

        this.setState({
          timer: timer - 1
        })

        if (timer === 0) {
          this.stopRecording();
        }
      }, 1000);
    }
  }
  stopRecording = () => {
    if (this.camera) {
      window.clearInterval(this.interval);
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
        timer: 5
      })
    }
  }
}

export default connect()(Record);
