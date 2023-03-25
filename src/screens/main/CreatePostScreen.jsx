import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MakePhotoIcon } from "../../assets/custom-icons";

export default function CreatePostScreen() {
  const [picture, setPicture] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLibraryPermission, setHasLibraryPermission] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(camera.status === "granted");

      const library = await MediaLibrary.requestPermissionsAsync();
      setHasLibraryPermission(library.status === "granted");
    })();
  }, []);

  const makePhoto = async () => {};

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const getLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasLibraryPermission(status === "granted");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraBox}>
        <Camera style={styles.camera} ref={cameraRef} ratio="16:9">
          <TouchableOpacity onPress={getLibraryPermission}>
            <MakePhotoIcon />
          </TouchableOpacity>
        </Camera>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  cameraBox: {
    // flex: 1,
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) / 1.5,
    // height: 240,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(232, 232, 232)",
    overflow: "hidden",
    // resizeMode: "cover",
  },
  camera: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

// const [picture, setPicture] = useState(null);
// const [startCamera, setStartCamera] = useState(false);
// const [accessToLibrary, setAccessToLibrary] = useState(false);

// const cameraRef = useRef();

// useEffect(() => {
//   async () => {
//     await __startCamera();
//     await __accessToLibrary();
//     // console.log(startCamera);
//     // console.log(accessToLibrary);
//   };
// }, []);

// useEffect(() => {
//   async () => {
//     await MediaLibrary.saveToLibraryAsync(picture.uri);
//   };
// }, [picture]);

// const makePhoto = async () => {
//   const photo = await cameraRef.current.takePictureAsync();
//   await MediaLibrary.requestPermissionsAsync();
//   await MediaLibrary.saveToLibraryAsync(photo.uri);
//   console.log(MediaLibrary);
//   // console.log(picture.uri);
//   setPicture(photo);
//   console.dir(picture);
// };

// const __startCamera = async () => {
//   const { status } = await Camera.requestCameraPermissionsAsync();
//   if (status === "granted") {
//     setStartCamera(true);
//   } else {
//     Alert.alert("Access denied");
//   }
// };

// const __accessToLibrary = async () => {
//   const { status } = await MediaLibrary.requestPermissionsAsync();
//   if (status === "granted") {
//     setAccessToLibrary(true);
//   } else {
//     Alert.alert("Access denied");
//   }
// };
