import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

// IMPORT PAGES
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Configuration from '../pages/Configuration';
// import Activity from '../pages/Activity';

//IMPORT ICON SVG
// import IconCloseSquare from '../assets/icons/close-square.svg';

const DrawerRoutes = () => {

  function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        // source={require('@expo/snack-static/react-native-logo.png')}
      />
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: true,
        drawerActiveTintColor: '#Ec7C27',
        drawerInactiveTintColor: '#858585',
        drawerActiveBackgroundColor: '#F4F4F4',
        // drawerHideStatusBarOnOpen
        drawerLabelStyle: {
          // fontFamily: 'gilroymedium',
          fontSize: 17,
          textTransform: 'capitalize',
        },
        drawerStyle: {
          backgroundColor: '#FFF',
          elevation: 0,
          borderWidth: 0,
          shadowColor: 'transparent',
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          // headerTitle: (props => <LogoTitle {...props} />),
          headerShown: true,
          title: 'Blog do Ney Lima',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            // fontFamily: 'gilroymedium',
            // fontSize: 17,
            color: '#Ec7C27',
          },
          headerStyle: {
            backgroundColor: '#FFF',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
          headerRight: () => (
            <Feather 
              name="bell" 
              size={24} 
              color="#000"
              style={{ paddingHorizontal: 24 }}
              // onPress={() => {}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerLabel: 'Contato',
          drawerIcon: ({ color, size }) => (
            <Feather name="mail" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configuration"
        component={Configuration}
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Spot"
        component={Spot}
        options={{
          drawerLabel: 'Local',
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}


export default DrawerRoutes;
