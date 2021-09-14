import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator, LogBox } from 'react-native';

import Routes from './routes';

const AppMobile: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </View>
  );
}

export default AppMobile;
