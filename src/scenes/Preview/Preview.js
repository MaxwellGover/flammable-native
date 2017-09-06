import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fbAuth, db, storageRef } from '~/config/settings';
import RNFetchBlob from 'react-native-fetch-blob';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements';
import styles from './styles';

const Blob = RNFetchBlob.polyfill.Blob;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

PreviewPropTypes = {
  videoPathOnDevice: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  songDownloadUrl: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'cover',
      paused: true,
      isBuffering: false,
      isLoaded: false
    }
  }
  handlePlay = () => {
    this.setState({paused: false})
  }
  handleVideoLoaded = () => {
    // Show play button when isLoaded is true
    this.setState({isLoaded: true})
  }
  handlePostPreview = () => {
    console.log('posting preview');
    let rnfbURI = RNFetchBlob.wrap(this.props.videoPathOnDevice);
    Blob
      .build(rnfbURI, { type : 'video/mov'})
      .then((blob) => {
        console.log(blob);
        storageRef.child('video/' + `${this.props.songName}.mov`).put(blob, { contentType : 'video/mov' })
          .then((snapshot) => {
            console.log('saved to storage!');
            const downloadURL = snapshot.downloadURL
            console.log(downloadURL);

            const previewId = 1

            const preview = {
              song: this.props.songDownloadUrl,
              video: downloadURL,
              videoFileName: `${this.props.songName}.mov`,
              previewId: previewId,
              details: {
                total_views: 0,
                purchases: 0,
                amount_made: 0,
                likes: 0,
                dislikes: 0,
                feedback: []
              }
            }

            db.ref(`users/${this.props.uid}/activePreview`).set(preview);
            db.ref(`activePreviews/${this.props.uid}`).set(preview);
            Actions.me();
          }).catch(error => console.log(error));
      })
  }
  render() {
    console.log(this.props.songName)
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.videoPathOnDevice}}
          style={styles.backgroundVideo}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.state.handlePlay}
          onBuffer={() => {}}
          onProgress={() => {}}
          repeat={true}
        />
        <View style={styles.controls}>
         <Icon
           reverse
           onPress={this.handlePostPreview}
           name='thumb-up'
           color='#4EF47D'
         />
       </View>
      </View>
    );
  }
}

function mapStateToProps ({uploads, user}) {
  console.log(user);
  console.log(uploads);
  return {
    videoPathOnDevice: uploads.path,
    songDownloadUrl: uploads.songDownloadUrl,
    songName: uploads.songName,
    uid: user.user.uid
  }
}

export default connect(mapStateToProps)(Preview);
