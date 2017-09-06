import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { db } from '~/config/settings';

import globalStyles from '~/config/styles';
import Feed from './components/Feed/Feed';
import styles from './styles';

// TODO: Add function here that updates feed w/ latest data
// when pulled down

HomePropTypes = { following: PropTypes.object.isRequired };

class Home extends Component {
  state = {
    feed: []
  }
  componentDidMount = () => {
    for (aid in this.props.following) {
      db.ref(`users/${aid}/activePreview`).once('value')
        .then(snapshot => {
          this.setState({ feed: this.state.feed.concat(snapshot.val())});
        }
      )
    }
  }
  render() {
    return (
      <View style={globalStyles.sceneStyle}>
        <Feed feed={this.state.feed} />
      </View>
    );
  }
}

function mapStateToProps({user}) {
  return {
    following: user.user.following
  }
}

export default connect(mapStateToProps)(Home);
