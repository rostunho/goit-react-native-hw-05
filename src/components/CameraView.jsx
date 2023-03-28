import { forwardRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";
import { MakePhotoIcon } from "../assets/custom-icons";

const CameraView = forwardRef((props, ref) => {
  console.dir(Camera);
  return (
    <Camera style={styles.camera} ref={ref} ratio="1:1" zoom={0}>
      <TouchableOpacity onPress={props.onPress}>
        <MakePhotoIcon />
        {/* <Text style={{ color: "#fff" }}>Camera View</Text>git */}
      </TouchableOpacity>
    </Camera>
  );
});

export default CameraView;

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
