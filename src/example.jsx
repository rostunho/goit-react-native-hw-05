import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Button } from "react-native";
const StackSettings = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [startCamera, setStartCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const makePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.dir("photo :>> ", photo);
  };
  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  return (
    <>
      <Text>{text}</Text>
      {startCamera ? (
        <>
          <Camera
            style={{ flex: 1, width: "100%", height: "50%" }}
            ref={cameraRef}
          >
            <Button title="Photo" onPress={makePhoto} />
          </Camera>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Input something..."
                style={{ borderBottomColor: "black", backgroundColor: "white" }}
                onChangeText={(value) => {
                  console.log(value);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default StackSettings;
