/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  CameraRoll,
  FlatList,
  Text,
  Dimensions,
  Button
} from "react-native";
import { List, ListItem } from "react-native-elements";
import RNFetchBlob from "react-native-fetch-blob";
import Clarifai from "clarifai";
import Speech from "react-native-speech";
//import { Container, Header, Content, List, ListItem, Text } from 'native-base';

const app = new Clarifai.App({
  apiKey: "f73540863306425c809a0401e9080470"
});

export default class TellScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
      stringToSay: "",
      data: {},
      conceptsLoaded: false,
      selected: false
    };
  }
  componentDidMount() {
    // set the path sent from the CameraScreen
    this.setState({
      path: this.props.navigation.state.params.path
    });
  }
  componentWillUnmount() {
    console.log("tellscreen unmounted");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // check for path change sent from CameraScreen
    const prevPath = prevState.path;
    const newPath = this.state.path;
    if (prevPath !== newPath) {
      this.sendPicture();
    }
    // check for stringToSay updated from Clarifai API
    const prevStringToSay = prevState.stringToSay;
    const newStringToSay = this.state.stringToSay;
    if (prevStringToSay !== newStringToSay) {
      this.speech();
    }
  }
  // send the picture data to Clarifai API
  sendPicture = async function() {
    // save to CameraRoll
    CameraRoll.saveToCameraRoll(this.state.path);
    // convert the image to base64 data
    RNFetchBlob.fs
      .readFile(this.state.path, "base64")
      .then(data => {
        app.models
          .predict(Clarifai.GENERAL_MODEL, { base64: data })
          .then(response => {
            // do something with response
            console.log("response from clarifai ", response);
            this.setState({
              data: response,
              conceptsLoaded: true
            });
            this.createStringOfNames();
          });
        // function(err) {
        //   // there was an error
        // }
        //);
      })
      .catch(error => {
        // error on converting image to base64 data
        console.log(error);
      });
  };

  createStringOfNames() {
    // get the object of conecpts from api
    const obj = this.state.data.outputs[0].data.concepts;
    // empty string to store string concation
    let result = "";
    // loop through the object to get the name of concept and add to result
    for (var key in obj) {
      result += `${obj[key].name}, `;
    }
    //set the state of the stringToSay
    this.setState({
      stringToSay: result
    });
    timer();
  }

  // speech say the damn thing
  speech() {
    if (this.state.conceptsLoaded) {
      Speech.speak({
        text: this.state.stringToSay
      });
    }
  }
  timer() {
    console.log("im in the timer");
    this.setState({
      selected: 3
    });
  }
  _onPressButton(id) {
    // console.log(event.target.name);
    console.log(id);
    // rightIcon={{
    //   name: "volume-up",
    //   type: "font-awesome",
    //   style: { marginRight: 10, fontSize: 22, opacity: 0}
    // }}
    // style={{color:item.isClicked ? likeColor : normalColor}}
  }
  render() {
    // const textColor = this.state.selected ? "green" : "white";
    // console.log(textColor);
    return (
      <View style={{ flex: 1 }}>
        <List style={{ height: 100 }}>
          {this.state.conceptsLoaded ? (
            <FlatList
              styles={styles.list}
              data={this.state.data.outputs[0].data.concepts}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item, index }) => {
                // console.log(`Item = ${item.name}, index = ${index}`);
                return (
                  <View>
                    <ListItem
                      style={styles.active}
                      // onPress = {this._onPressButton(item.id)}
                      onPress={() => {
                        this._onPressButton(index);
                      }}
                      id={item.id}
                      extraData={this.state}
                      title={item.name}
                      rightIcon={{
                        name: "volume-up",
                        type: "font-awesome",
                        style: { marginRight: 10, fontSize: 22, opacity: 1 }
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.loading}>Loading...</Text>
          )}
        </List>
        {/* <View style={styles.buttons}>
          <Button
            title="take picture"
            onPress={() => {
              this._onPressButton(index);
            }}
          >
            takePicture
          </Button>
        </View>; */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  list: {
    height: Dimensions.get("window").height - 50
    //flexGrow: 1
  },
  buttons: {
    flex: 0.4,
  },
  loading: {
    justifyContent: "center"
  },
  active: {
    backgroundColor: "red"
  }
});
