/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from "./screens/Home"
import Search from "./screens/Search"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Tab = createBottomTabNavigator()
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff"></StatusBar>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "home") {
              iconName = "home-city-outline"
            } else if (route.name === "search") {
              iconName = "city"
            }
            return <MaterialCommunityIcons name={iconName} size={25} color={color} />
          }
        })}
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "gray",
            activeBackgroundColor: "blue"
          }}>

          <Tab.Screen name='home' component={Home} initialParams={{city:"hanoi"}}/>
          <Tab.Screen name='search' component={Search} />

        </Tab.Navigator>
      </NavigationContainer>
    </>
  );

};


export default App;
