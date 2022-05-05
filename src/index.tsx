import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, StatusBar, ActivityIndicator, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import AppLoading from 'expo-app-loading';
import { Host } from 'react-native-portalize';

import ThemeProvider from './contexts/theme';
import { ShareProvider } from './contexts/share';

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
    <ThemeProvider>
    <NavigationContainer>
      <Host>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
              <ShareProvider>
                <Routes />
              </ShareProvider>
          </View>
      </Host>
    </NavigationContainer>
    </ThemeProvider>
  );
}

export default AppMobile;
