/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  StatusBar,
  Dimensions,
  YellowBox
} from "react-native";
import SplashScreen from 'react-native-splash-screen';


const instructions = Platform.select({
  ios:
    "Take a picture\n" +
    "Accept it to send it to Clarifai API\n" +
    "\n" +
    "What's That? \nwill describe what is in the picture \n",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class HomeScreen extends Component<Props> {
  componentDidMount(){
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.ignoredYellowBox = ['Remote debugger'];
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          // barStyle="light-content"
          backgroundColor="#4F6D7A"
        />

        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("CameraScreen")}>
          <Image source={require('../../assets/images/homePage.png')} />


        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#BD2D87'
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF',
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    // fontFamily: "Pentay-Sans-Regular"
    //fontFamily: "Herculanum"
  },

});
