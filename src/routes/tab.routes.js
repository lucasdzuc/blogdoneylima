import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// IMPORT PAGES
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Configuration from '../pages/Configuration';
// import Activity from '../pages/Activity';

//IMPORT ICON SVG
// import IconCloseSquare from '../assets/icons/close-square.svg';

const DrawerRoutes = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#000',
        inactiveTintColor: 'rgba(0, 0, 0, 0.3)',
        labelStyle: {
          // fontFamily: 'gilroymedium',
          fontSize: 14,
          textTransform: 'capitalize',
        },
        tabStyle: {
          paddingTop: 6,
          paddingBottom: 6,
          // backgroundColor: 'red',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          // tabBarIcon: ({ color, size }) => (
          //   <HomeIcon name="home" color={color} size={24} />
          // ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: 'Contato',
          // tabBarIcon: ({ color, size }) => (
          //   <HomeIcon name="home" color={color} size={24} />
          // ),
        }}
      />
      <Drawer.Screen
        name="Configuration"
        component={Configuration}
        options={{
          tabBarLabel: 'Configurações',
          // tabBarIcon: ({ color, size }) => (
          //   <CardapioIcon name="cardapio" color={color} size={24} />
          // ),
        }}
      />
      {/* <Drawer.Screen
        name="Spot"
        component={Spot}
        options={{
          tabBarLabel: 'Local',
          tabBarIcon: ({ color, size }) => (
            <LocationIcon name="location" color={color} size={24} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}


export default DrawerRoutes;
