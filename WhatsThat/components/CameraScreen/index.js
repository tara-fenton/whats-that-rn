/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";

import Camera from "react-native-camera";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }
  componentDidMount() {
    process.nextTick = setImmediate;
  }
  componentWillUnmount() {
    console.log('camera unmounted');
  }

  takePicture() {
    this.camera
      .capture()
      .then(data => {
        this.setState({ path: data.path });
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={cam => (this.camera = cam)}
        aspect={Camera.constants.Aspect.fill}
        type={Camera.constants.Type.back}
        style={styles.preview}
        flashMode={Camera.constants.FlashMode.off}
        captureTarget={Camera.constants.CaptureTarget.disk}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image source={{ uri: this.state.path }} style={styles.preview} />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >
          Cancel
        </Text>
        <TouchableOpacity style={styles.accept}  onPress={() => this.acceptPicture()}>
          <Image source={require('../../assets/images/accept.png')} />


        </TouchableOpacity>
        {/* <Text style={styles.accept} onPress={() => this.acceptPicture()}>
          <Image source={require('../../assets/images/homePage.png')} />
        </Text> */}
      </View>
    );
  }

  acceptPicture() {
    console.log('in accept the pictre ', this.state.path);
    this.props.navigation.navigate("TellScreen",{
      path: this.state.path
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
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
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#FFF",
    marginBottom: 15
  },
  accept: {
    position: "absolute",
    right: 140,
    top: 500,
      marginBottom: 15,
      backgroundColor: "transparent",
  },
  cancel: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "transparent",
    color: "#BD2D87",
    fontWeight: "600",
    fontSize: 17
  }
});
