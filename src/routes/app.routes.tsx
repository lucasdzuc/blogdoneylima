import React, { useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import DrawerRoutes from './tab.routes';

// IMPORT PAGES
// import Home from '../pages/Home';
import Activity from '../pages/Activity';
import DetailNews from '../pages/DetailNews';
import Search from '../pages/Search';

//IMPORT ICON SVG
// import IconCloseSquare from '../assets/icons/close-square.svg';

// screenOptions={{ headerShown: true }}
export default function AppRoutes() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        {/* <Stack.Screen
          name="Home"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Contact"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Configutarion"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{
            headerShown: true,
            title: 'Notificações',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              // fontFamily: 'gilroymedium',
              fontSize: 17,
              color: '#000',
            },
            headerStyle: {
              backgroundColor: '#FFF',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="DetailNews"
          component={DetailNews}
          options={{
            headerShown: true,
            title: 'Notícia',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              // fontFamily: 'gilroymedium',
              fontSize: 17,
              color: '#Ec7C27',
            },
            headerStyle: {
              backgroundColor: '#FFF',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            title: 'Pesquisar',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              // fontFamily: 'gilroymedium',
              fontSize: 17,
              color: '#Ec7C27',
            },
            headerStyle: {
              backgroundColor: '#FFF',
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}