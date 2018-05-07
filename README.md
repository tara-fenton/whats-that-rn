# WhatsThat
an app that let's you take a picture and it says out loud what is in the image

### Steps to Install
react-native init WhatsThat

- npm install
- npm install react-navigation --save
- npm install react-native-camera --save
- npm install react-native-elements --save
- npm install react-native-vector-icons --save
- npm install react-native-fetch-blob --save
- npm install clarifai --save
- npm install react-native-speech --save
- npm install react-native-splash-screen@3.0.6 --save

- react-native link

### Xcode
Next, you need to drag the RCTCameraRoll.xcodeproj in your project folder to Xcode. Here is a simple diagram on where to find this file. \

https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0
 \
Drag the RCTCameraRoll.xcodeproj file to the libraries file in Xcode and then click on Build Phases on the top right-hand corner in Xcode. Click the drop down of Link Binary With Libraries, then the + sign to add the libRCTCameraRoll.a. \
 \
Add libRCTCameraRoll.a to WhatsThatTest as well \
 \
 \

In Xcode FileFinder on project in General tab, \
 Bundle Identifier : com.tarafenton (your name) \
 Signing select personal team. \
 Deployment Info : Deployment Target iOS 11.3 \
 Targets: WhatsThatTest - Signing select personal team. \
 \
 Press Play to build  \


 Noun Project - Icons \
 Sergey Demuskin camera flip \
 mikicon question mark \
 Allison Iven cancel \



To see backlog of creation look at this repo https://git.generalassemb.ly/tara-fenton/shoTel in experiments/camera-6/camera
