import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '~/config/styles';

function PreSplash(props) {
  return (
    <View style={globalStyles.sceneStyle}>
      <Text style={{color: '#FFF'}}>
        Flammable
      </Text>
    </View>
  );
}

export default PreSplash;
