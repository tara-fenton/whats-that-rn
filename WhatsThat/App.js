/**
 * shoTel
 */

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import TellScreen from './components/TellScreen';

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
        headerTitle: "What's That?",
        headerTintColor: '#BD2D87',
        headerStyle: {
            backgroundColor: '#B191FF'
        }
    }
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: {
        headerTitle: "What's That?",
        headerTintColor: '#BD2D87',
        headerStyle: {
            backgroundColor: '#B191FF'
        }
    }
  },
  TellScreen: {
    screen: TellScreen,
    navigationOptions: {
        headerTitle: "What's That?",
        headerTintColor: '#BD2D87',
        headerStyle: {
            backgroundColor: '#B191FF'
        }
    }
  },
});
