import { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { TakePhotoIcon } from "../../assets/custom-icons";

export default function CreatePostScreen() {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await Camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraBox}>
        <Camera style={styles.camera} ref={setCamera}>
          <TouchableOpacity onPress={takePhoto}>
            <TakePhotoIcon />
          </TouchableOpacity>
        </Camera>
      </View>
      {/* <Text style={{ fontSize: 40 }}>CREATE POST SCREEN</Text> */}
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
