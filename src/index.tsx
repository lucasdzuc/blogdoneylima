import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator, LogBox } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { Host } from 'react-native-portalize';

// import ShareProvider from './contexts/share';

import Routes from './routes';

const AppMobile: React.FC = () => {

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', }}>
  //       <ActivityIndicator size='large' color="#999591" />
  //     </View>
  //   );
  // };

  return (
    <>
      <Host>
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Routes />
        </View>
      </Host>
    </>
  );
}

export default AppMobile;
