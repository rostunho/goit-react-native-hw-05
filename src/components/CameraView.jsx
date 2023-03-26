import { forwardRef } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { MakePhotoIcon } from "../assets/custom-icons";

const CameraView = forwardRef((props, ref) => {
  return (
    <Camera style={styles.camera} ref={ref} ratio="16:9">
      <TouchableOpacity onPress={props.onPress}>
        <MakePhotoIcon />
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
