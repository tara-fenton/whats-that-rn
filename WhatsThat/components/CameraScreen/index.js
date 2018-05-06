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
  Dimensions,
  TouchableHighlight,
  Image
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
    //this.fetchData();
    //this.createStringOfNames();
  }
  componentWillUnmount() {
    console.log('camera unmounted');
  }
  // this works but want to try something else
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Camera
  //         ref={cam => (this.camera = cam)}
  //         aspect={Camera.constants.Aspect.fill}
  //         type={Camera.constants.Type.back}
  //         style={styles.preview}
  //         flashMode={Camera.constants.FlashMode.on}
  //         //captureTarget={RNCamera.constants.CaptureTarget.disk}
  //         // captureTarget={Camera.constants.CaptureTarget.temp}
  //         // captureTarget={Camera.constants.CaptureTarget.memory}
  //         permissionDialogTitle={"Permission to use camera"}
  //         permissionDialogMessage={
  //           "We need your permission to use your camera phone"
  //         }
  //       />
  //       {/* <Image
  // source={{uri: this.state.baseImage, isStatic:true}}
  // style={{width: 100, height: 100}}
  // /> */}
  //
  //       <TouchableOpacity>
  //         <View style={styles.buttonContainer}>
  //           <Button
  //             onPress={this.sendPicture.bind(this)}
  //             title="Send Picture"
  //             color="#841584"
  //             accessibilityLabel="Send Picture"
  //           />
  //         </View>
  //       </TouchableOpacity>
  //       <TouchableOpacity>
  //         <View style={styles.buttonContainer}>
  //           <Button
  //             onPress={this.takePicture.bind(this)}
  //             title="Take Picture"
  //             color="#841584"
  //             accessibilityLabel="Take Picture"
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.capture(options);
  //     console.log("this is called");
  //     console.log(data);
  //     //console.log(this.camera.saveImage());
  //
  //     // let photo = await this.camera.takePictureAsync();
  //     //       console.log(photo);
  //     this.setState({
  //       baseImage: data.path
  //     });
  //     //RNFetchBlob.config({ path : RNFetchBlob.fs.dirs.DocumentDir + '/userThumbnails/user.png' +  })
  //   // const dirs = RNFetchBlob.fs.dirs
  //   //
  //   // console.log('BLOB   ',dirs);
  //   // console.log('BLOB   ',RNFetchBlob.fs.dirs);
  //   // const saved = await this.camera.saveImage();
  //   //   console.log(saved);
  //     // const data = await this.camera.capture();
  //     //CameraRoll.saveToCameraRoll( data.uri )
  //     //console.log("where the path ",this.camera.constants.CaptureTarget.memory);
  //     // captureTarget={Camera.constants.CaptureTarget.memory}
  //
  //   }
  // };
  // sendPicture = async function() {
  //   if (this.camera) {
  //     console.log("sendPicture is called");
  //     console.log(this.state.baseImage);
  //     // convert the image to base64 data
  //     RNFetchBlob.fs
  //       .readFile(this.state.baseImage, "base64")
  //       .then(data => {
  //         app.models
  //           .predict(Clarifai.GENERAL_MODEL, { base64: data })
  //           .then(response => {
  //             // do something with response
  //             console.log("response from clarifai ", response);
  //             this.setState({
  //               data: response,
  //               conceptsLoaded: true
  //             });
  //             this.createStringOfNames();
  //           });
  //         // function(err) {
  //         //   // there was an error
  //         // }
  //         //);
  //       })
  //       .catch(error => {
  //         // error on converting image to base64 data
  //         console.log(error);
  //       });
  //   }
  // };
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
        <Text style={styles.accept} onPress={() => this.acceptPicture()}>
          OK
        </Text>
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
    right: 180,
    top: 540,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17,
      marginBottom: 15,
      backgroundColor: "transparent",
  },
  cancel: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "transparent",
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17
  }
});
