import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert, Button } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraView from "./CameraView";
import PhotoPreview from "./PhotoPreview";
import Notification from "./Notification";

export default function PhotoViewer({ setPhoto }) {
  const [picture, setPicture] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLibraryPermission, setHasLibraryPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const cameraRef = useRef();

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      try {
        const camera = await Camera.requestCameraPermissionsAsync();
        if (!camera.granted) {
          setErrorMessage("Access to Camera denied");
        }
        setHasCameraPermission(camera.status === "granted");
      } catch (error) {
        return Alert.alert(error.message);
      }

      try {
        const library = await MediaLibrary.requestPermissionsAsync();
        if (!library.granted) {
          setErrorMessage("Access to Media Library denied");
        }
        setHasLibraryPermission(library.status === "granted");
      } catch (error) {
        return Alert.alert(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    setPhoto(picture);
  }, [picture]);

  //   const checkPermissions = async () => {
  //     requestPermission();
  //     Alert.alert(permissionResponse.status);
  //   };

  const onPressTrigger = async () => {
    const photo = await __makePhoto();
    await __savePhoto(photo);
  };

  const clearPreview = async () => {
    setPicture(null);
  };

  const __makePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPicture(photo);
      return photo;
    } catch (error) {
      return error.message;
    }
  };

  const __savePhoto = async (photo = picture) => {
    if (!hasLibraryPermission) {
      return Alert.alert(errorMessage);
    }

    try {
      const savedPhoto = await MediaLibrary.createAssetAsync(photo.uri);
      return savedPhoto;
    } catch (error) {
      return error.message;
    }
  };

  return (
    <>
      {/* <Button title="CHECK PERMISSIONS" onPress={checkPermissions} /> */}
      <View style={styles.cameraBox}>
        {picture ? (
          <PhotoPreview source={{ uri: picture.uri }} onPress={clearPreview} />
        ) : hasCameraPermission ? (
          <CameraView ref={cameraRef} onPress={onPressTrigger} />
        ) : (
          <Notification message={errorMessage} />
        )}
      </View>
    </>
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
  },
  cameraBox: {
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) / 1.5,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(232, 232, 232)",
    overflow: "hidden",
  },
});
