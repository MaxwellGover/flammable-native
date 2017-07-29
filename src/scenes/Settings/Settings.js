import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { TouchableListItem } from '~/components';
import { signOut } from '~/redux/modules/authentication';
import { Actions } from 'react-native-router-flux';
import globalStyles from '~/config/styles';
import PropTypes from 'prop-types';

SettingsPropTypes = {
  dispatch: PropTypes.func.isRequired
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this)
  }
  handleSignOut() {
    this.props.dispatch(signOut);
  }
  render() {
    return (
      <View style={globalStyles.sceneStyle}>
        <TouchableListItem
          title="Sign Out"
          hideChevron={true}
          isSignOutButton="true"
          handleOnPress={this.handleSignOut}
        />
      </View>
    );
  }
}

export default connect()(Settings);
