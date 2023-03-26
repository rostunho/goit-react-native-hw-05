import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import PhotoViewer from "../../components/PhotoViewer";

export default function CreatePostScreen() {
  const [photo, setPhoto] = useState(null);

  return (
    <View style={styles.container}>
      <PhotoViewer setPhoto={setPhoto} />
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
  },
});
